import express, { Request, Response, NextFunction } from "express";
import DatabaseService from '../services/database';

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Hello World" });
});

// Create a new redirection
router.post('/redirections', async (req, res) => {
  try {
    const { sourceUrl, targetUrl, description } = req.body;
    const redirection = await DatabaseService.createRedirection(sourceUrl, targetUrl, description);
    res.json(redirection);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create redirection' });
  }
});

// Get redirection by source URL
router.get('/redirect/:sourceUrl(*)', async (req, res) => {
  try {
    const sourceUrl = req.params.sourceUrl;
    const redirection = await DatabaseService.getRedirection(sourceUrl);
    
    if (!redirection || !redirection.isActive) {
      return res.status(404).json({ error: 'Redirection not found' });
    }

    // Log the redirection
    await DatabaseService.logRedirection(
      redirection.id,
      req.headers['user-agent'],
      req.ip
    );

    res.redirect(redirection.targetUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process redirection' });
  }
});

// Update a redirection
router.put('/redirections/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { targetUrl, isActive, description } = req.body;
    const redirection = await DatabaseService.updateRedirection(id, {
      targetUrl,
      isActive,
      description,
    });
    res.json(redirection);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update redirection' });
  }
});

// Delete a redirection
router.delete('/redirections/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await DatabaseService.deleteRedirection(id);
    res.json({ message: 'Redirection deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete redirection' });
  }
});

// Get redirection logs
router.get('/redirections/:id/logs', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const logs = await DatabaseService.getRedirectionLogs(id);
    res.json(logs);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch redirection logs' });
  }
});

export default router;
