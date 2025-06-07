import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Card, CardContent } from "@/components/atoms/card/card";
import { Typography } from "@/components/atoms/typography/typography";
import { useMocksStore } from "@/devtool-panels/api-tracker/store/mocks";
import { Badge } from "@/components/atoms/badge/badge";
import { Button } from "@/components/atoms/button/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog/alert-dialog";

interface ValidationError {
  message: string;
  line?: number;
}

export function EditMock() {
  const { id } = useParams<{ id: string }>();
  const { fetchCurrentMock } = useMocksStore();
  const [editorValue, setEditorValue] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [originalValue, setOriginalValue] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const currentMock = useMocksStore((state) => state.currentMock);
  const navigate = useNavigate();
  const { updateMock } = useMocksStore();

  useEffect(() => {
    async function fetchMock() {
      if (!id) return;
      fetchCurrentMock(id);
    }

    fetchMock();
  }, [id, fetchCurrentMock]);

  useEffect(() => {
    if (currentMock) {
      const formattedMock = JSON.stringify(currentMock, null, 2);
      setEditorValue(formattedMock);
      setOriginalValue(formattedMock);
      setIsModified(false);
      setValidationError(null);
    }
  }, [currentMock]);

  const validateJSON = (value: string): ValidationError | null => {
    try {
      JSON.parse(value);
      return null;
    } catch (error) {
      if (error instanceof SyntaxError) {
        const match = error.message.match(/at position (\d+)/);
        const position = match ? parseInt(match[1]) : undefined;

        // Calculate line number from position if available
        let line: number | undefined;
        if (position !== undefined) {
          line = value.substring(0, position).split("\n").length;
        }

        return {
          message: error.message,
          line,
        };
      }
      return {
        message: "Invalid JSON format",
      };
    }
  };

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    const error = validateJSON(value);
    setValidationError(error);
    setIsModified(value !== originalValue);
  };

  const handleSaveConfirm = () => {
    if (validationError || !isModified) return;
    try {
      const parsedValue = JSON.parse(editorValue);
      updateMock(id, parsedValue).then(() => {
        navigate("/");
      });
      setShowSaveDialog(false);
    } catch (error) {
      console.error("Validation failed during save:", error);
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h4">Edit Mock Response</Typography>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Typography>URL: {id}</Typography>
            {isModified && !validationError && (
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800"
              >
                Modified
              </Badge>
            )}
            {validationError && (
              <Badge variant="destructive">
                Invalid JSON{" "}
                {validationError.line ? `at line ${validationError.line}` : ""}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <Button
                variant="outline"
                disabled={!isModified || !!validationError}
                onClick={() => setShowSaveDialog(true)}
              >
                Save Changes
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save Changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to save these changes? This action
                    will update the mock response.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveConfirm}>
                    Save Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {validationError && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {validationError.message}
          </div>
        )}
        <div className="h-[600px] w-full border rounded-md overflow-hidden">
          <CodeMirror
            value={editorValue}
            height="600px"
            theme={vscodeDark}
            extensions={[json()]}
            onChange={handleEditorChange}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
              autocompletion: true,
              bracketMatching: true,
              closeBrackets: true,
              indentOnInput: true,
              searchKeymap: true,
              defaultKeymap: true,
              crosshairCursor: true,
              highlightSelectionMatches: true,
              rectangularSelection: true,
              highlightActiveLineGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
