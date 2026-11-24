import { WEB_APP } from './siteData'

const downloadTool = {
  name: 'get_penrill_downloads',
  description: 'List the Penrill web app and download links for Windows (exe), macOS (dmg), and Linux (AppImage and deb). Desktop links lead to the latest release page when an installer is unavailable.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  annotations: { readOnlyHint: true },
  async execute() {
    const packages = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-penrill-package]'), link => ({
      format: link.dataset.penrillPackage,
      url: link.href
    }))
    return { content: [{ type: 'text', text: JSON.stringify({ web: WEB_APP, packages }) }] }
  }
}

interface WebMcpHost {
  modelContext?: { registerTool(tool: typeof downloadTool): void | Promise<void> }
}

export async function registerDownloadTool() {
  // Early WebMCP implementations exposed modelContext on navigator.
  const context = (document as WebMcpHost).modelContext ?? (navigator as WebMcpHost).modelContext
  await context?.registerTool?.(downloadTool)
}
