# n8n-nodes-tibber

This is an n8n node to access the Tibber API. It allows you to fetch data from your Tibber account, including home information, consumption data, and price information.

[Tibber](https://tibber.com/) is a digital electricity supplier that provides real-time energy consumption data and smart home integration.

## Installation

### In n8n Desktop or Cloud
1. Go to **Settings > Community Nodes**
2. Click on **Install**
3. Enter `n8n-nodes-tibber` in the **Name** field
4. Click **Install**

### In your own n8n instance
1. Install the package:
```bash
npm install n8n-nodes-tibber
```
2. Restart n8n

## Usage

### Authentication
To use this node, you need a Tibber API token:

1. Create a developer account at [developer.tibber.com](https://developer.tibber.com/)
2. Generate an access token
3. Use this token in the Tibber API credentials in n8n

### Available Operations

#### Home
- **Get**: Retrieves information about all homes in your Tibber account
- **Get Consumption**: Fetches consumption data for a specific home with various resolution options (hourly, daily, weekly, monthly, annual)
- **Get Price**: Retrieves current, today's, and tomorrow's price information for a specific home

## Example Workflows

### Monitor Energy Prices
Create a workflow that checks energy prices daily and sends you a notification when prices are low.

### Track Energy Consumption
Set up a workflow to record your energy consumption data to a database for long-term analysis.

## Resources
- [Tibber API Documentation](https://developer.tibber.com/)
- [n8n Documentation](https://docs.n8n.io/)

## Version History

### 1.0.4 (2025-08-05)
- Moved index.ts from src/ to root directory for proper n8n community node structure
- Updated TypeScript configuration to handle mixed source locations

### 1.0.3 (2025-08-05)
- Corrected package name to "n8n-nodes-tibber" (with 's') for proper n8n compatibility
- Updated all references and installation instructions to use correct package name

### 1.0.2 (2025-08-05)
- Fixed package name to match directory name for proper loading in n8n
- Updated all references to use consistent package name

### 1.0.1 (2025-08-05)
- Added n8n-community-node-package keyword for better discoverability
- Fixed build script to use npx for better package manager compatibility

### 1.0.0 (2025-08-05)
- Initial release
- Support for retrieving home information
- Support for fetching consumption data with various resolution options
- Support for retrieving price information

## License
MIT