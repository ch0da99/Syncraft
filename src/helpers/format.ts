export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-600";
    case "revised":
      return "bg-yellow-600";
    case "denied":
      return "bg-red-600";
    case "started":
      return "bg-blue-600";
    case "draft":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
}

export function getDecisionIcon(status: string) {
  switch (status) {
    case "approved":
      return "✅";
    case "revised":
      return "✏️";
    case "denied":
      return "❌";
    case "started":
      return "🚀";
    case "draft":
      return "📝";
    default:
      return "➖";
  }
}
