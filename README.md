# Sorting Visualizer

An interactive web application for visualizing various sorting algorithms with step-by-step animations. Built with React and styled with custom CSS for a sleek dark theme.

## Features

- **12 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort, Heap Sort, Shell Sort, Counting Sort, Radix Sort, Bucket Sort, Timsort, and Introsort
- **Interactive Visualization**: Real-time step-by-step animation of sorting processes
- **Color-Coded Elements**: Different colors for comparing, active, and sorted elements
- **Playback Controls**: Play, pause, step forward/backward, and reset functionality
- **Customizable Settings**: Adjustable array size and animation speed
- **Algorithm Information**: Detailed descriptions, time/space complexity, and stability information for each algorithm
- **Responsive Design**: Works on both desktop and mobile devices
- **Dark Theme**: Modern dark aesthetic for comfortable viewing

## Demo

The application is deployed on GitHub Pages: [https://hareeshkuchi.github.io/Sorting-Visualizer/](https://hareeshkuchi.github.io/Sorting-Visualizer/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hareeshkuchi/Sorting-Visualizer.git
cd Sorting-Visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm test`
Launches the test runner.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: This is a one-way operation!**

Ejects from Create React App configuration.

## Deployment to GitHub Pages

The application is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment
1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy the application
3. The app will be available at `https://[username].github.io/[repository-name]/`

### Manual Deployment
If you prefer to deploy manually:

1. Build the application:
```bash
npm run build
```

2. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

3. Deploy to GitHub Pages:
```bash
npx gh-pages -d build
```

## Project Structure

```
src/
├── algorithms.js          # Sorting algorithm implementations
├── AnimationController.js # Animation playback management
├── App.js                 # Main application component
├── App.css               # Custom styling
├── App.test.js           # Application tests
├── CodeSidecar.js        # Pseudocode display component
├── ControlPanel.js       # User controls component
├── index.js              # Application entry point
├── index.css            # Global styles
├── AlgorithmDescription.js # Algorithm information component
├── pseudocodes.js        # Algorithm pseudocode definitions
├── reportWebVitals.js    # Performance monitoring
├── setupTests.js         # Test configuration
└── Visualizer.js         # Bar chart visualization component
```

## Technologies Used

- **React 19.2.6**: Frontend framework
- **JavaScript ES6+**: Algorithm implementations
- **CSS3**: Custom styling with CSS variables
- **Create React App**: Build tooling
- **GitHub Actions**: CI/CD for deployment
- **GitHub Pages**: Hosting platform

## Algorithm Details

Each sorting algorithm includes:
- Step-by-step visualization
- Pseudocode highlighting
- Time and space complexity information
- Stability status
- Detailed description of how the algorithm works

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
