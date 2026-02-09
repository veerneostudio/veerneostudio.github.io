# VeerNeo Studio

Innovation in AI Generated CAD Development

## Website

This repository contains the portfolio and documentation website for VeerNeo Studio, hosted on GitHub Pages.

**Live Site:** https://veerneostudio.github.io

## Features

- Automated deployment via GitHub Actions
- Static site hosting on GitHub Pages
- Responsive design for all devices

## Deployment

This site is automatically deployed whenever commits are pushed to the `main` branch via the GitHub Actions workflow defined in `.github/workflows/deploy-pages.yml`.

### Manual Deployment

To manually trigger a deployment:
1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. Updates will be live within seconds

## Project Structure

```
.
├── index.html              # Main website page
├── README.md              # This file
├── LICENSE                # MIT License
├── .gitignore             # Git ignore rules
└── .github/workflows/
    └── deploy-pages.yml   # GitHub Actions deployment workflow
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

VeerNeo Studio Team
