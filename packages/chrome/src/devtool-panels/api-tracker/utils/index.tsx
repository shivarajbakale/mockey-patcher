export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDuration = (duration: number) => {
  if (duration < 1000) return `${duration.toFixed(0)}ms`;
  return `${(duration / 1000).toFixed(2)}s`;
};

export const formatRequestBody = (
  body: string | chrome.devtools.network.Request["request"]["postData"],
) => {
  if (typeof body === "string") return body;
  if (!body) return "No request body";
  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
};

export const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case "GET":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    case "POST":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "PUT":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    case "DELETE":
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  }
};

export const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300)
    return "bg-green-500/10 text-green-700 dark:text-green-400";
  if (status >= 400) return "bg-red-500/10 text-red-700 dark:text-red-400";
  if (status >= 300)
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
  return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
};
