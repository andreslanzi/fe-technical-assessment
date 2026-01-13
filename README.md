## Frontend Technical Assessment 🚀

### Overview

We want to see your skills with React and TypeScript. You'll be given a Figma design to replicate in a Vite project using Tailwind CSS. Plus, you'll use an AirOps app to fetch and display data.

### What You'll Do
1. **Fork the Repo**: You'll get a barebones Vite + React + TypeScript + Tailwind project. Fork it and get started.
2. **Design Implementation**: Copy the Figma design into your project. Make it look as close as possible.
3. **Data Integration**: [Create an AirOps Workflow](https://docs.airops.com/building-workflows/workflow-concepts) that returns the necessary mock data for the design and [execute it](https://github.com/airopshq/airops-js) to display the mock data! 📊

![Example of Airops App for the Data Integration](https://github.com/airopshq/fe-technical-assessment/blob/main/public/airpos-app-run-once-example.png)

> Note: if you need to do any create, edit or delete, it doesn’t need to persist anywhere outside of the React state.

### Time Frame
Try to finish within 3 hours. ⏰

### What We Care About
- **Code Quality**: Clean, readable, and well-structured code. 💻
- **Design Accuracy**: Your app should look like the Figma design. 🎨
- **Functionality**: Your app should fetch and display data correctly. 🔄

### How to Submit
1. Fork our repo.
2. Make your changes.
3. Push to your forked repo.
4. Share the link to your repo with us. 📤
5. **Important**: Do **not** create a pull request to the original repository.

### Tools
- React ⚛️
- TypeScript 📝
- Tailwind CSS 🎨
- Vite ⚡

### Getting Started
1. **Fork the Repo**:
   ```bash
   git clone [your-forked-repo-link]
   cd [repository-directory]
2. Install Dependencies:
   ```bash
   Copy code
   npm install
   ```
3. Start the Dev Server:
   ```bash
   Copy code
   npm run dev
   ```
4. Design Link: [Figma Design](https://www.figma.com/design/Tar7tYkKqTuaFdGQFgGthy/Technical-Assessment?node-id=0-1&t=F0fzk15QtPDufiX4-1)
5. **Relevant AirOps Links**:
    - [Building Your First Workflow](https://docs.airops.com/getting-started/readme/building-your-first-workflow)
    - [Client SDK](https://github.com/airopshq/airops-js)
    - [API](https://docs.airops.com/workflow-execution/api)

That's it! If you have any questions, just ask. Good luck! 🍀

### Environment Variables Setup

To connect to the AirOps API, you'll need to configure your environment variables. Follow these steps:

1. **Create a `.env` file** in the root directory of the project:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your AirOps credentials** in the `.env` file:
   - `VITE_USER_ID`: Your AirOps user ID
   - `VITE_WORKSPACE_ID`: Your AirOps workspace ID
   - `VITE_APP_ID`: Your AirOps app ID
   - `VITE_APP_VERSION`: (Optional) Your app version. (will use the default version if not provided)

3. **Add your AirOps API key** to the `.env` file:
   - `VITE_API_KEY`: Your AirOps API key
   - Note: `VITE_USER_ID` is already required in step 2 and will be used for generating the hash

4. **Generate `VITE_HASHED_USER_ID`** (Required):
   
   > ⚠️ **Important**: The `VITE_HASHED_USER_ID` cannot be found in your AirOps dashboard. You **must** generate it manually.
   
   Run the provided script that reads from your `.env` file:
   
   ```bash
   npm run generate-hash
   ```
   
   The script will automatically read `VITE_API_KEY` and `VITE_USER_ID` from your `.env` file and display the generated hash. Copy the output and add it to your `.env` file as `VITE_HASHED_USER_ID`.

5. **Get your other credentials** from your AirOps account dashboard or refer to the [AirOps documentation](https://docs.airops.com/getting-started/readme/building-your-first-workflow).

6. **Restart your dev server** after creating or updating the `.env` file:
   ```bash
   npm run dev
   ```

> **Note**: The `.env` file is already included in `.gitignore` to keep your credentials secure. Never commit your `.env` file to version control!