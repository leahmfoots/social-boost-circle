
@echo off
title RoundAbout Platform Launcher
color 0A

echo.
echo ========================================
echo    RoundAbout Platform Launcher
echo ========================================
echo.

:menu
echo Please select an option:
echo.
echo 1. Start Development Server
echo 2. Build for Production
echo 3. Run Tests
echo 4. Deploy to Production
echo 5. Setup Development Environment
echo 6. View Documentation
echo 7. Database Management
echo 8. Performance Analysis
echo 9. Security Audit
echo 0. Exit
echo.
set /p choice="Enter your choice (0-9): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto test
if "%choice%"=="4" goto deploy
if "%choice%"=="5" goto setup
if "%choice%"=="6" goto docs
if "%choice%"=="7" goto database
if "%choice%"=="8" goto performance
if "%choice%"=="9" goto security
if "%choice%"=="0" goto exit
echo Invalid choice. Please try again.
pause
cls
goto menu

:dev
echo.
echo Starting development server...
echo.
npm run dev
pause
goto menu

:build
echo.
echo Building for production...
echo.
npm run build
echo.
echo Build completed! Check the 'dist' folder.
pause
goto menu

:test
cls
echo.
echo ========================================
echo           Test Management
echo ========================================
echo.
echo 1. Run All Tests
echo 2. Run Unit Tests Only  
echo 3. Run E2E Tests Only
echo 4. Run Tests with Coverage
echo 5. Run Visual Regression Tests
echo 6. Back to Main Menu
echo.
set /p test_choice="Enter your choice (1-6): "

if "%test_choice%"=="1" (
    echo Running all tests...
    npm run test:all
) else if "%test_choice%"=="2" (
    echo Running unit tests...
    npm run test:unit
) else if "%test_choice%"=="3" (
    echo Running E2E tests...
    npm run test:e2e
) else if "%test_choice%"=="4" (
    echo Running tests with coverage...
    npm run test:coverage
) else if "%test_choice%"=="5" (
    echo Running visual regression tests...
    npm run test:visual
) else if "%test_choice%"=="6" (
    goto menu
) else (
    echo Invalid choice.
)
pause
goto menu

:deploy
cls
echo.
echo ========================================
echo         Deployment Options
echo ========================================
echo.
echo 1. Deploy to Vercel
echo 2. Deploy to Netlify  
echo 3. Deploy to Railway
echo 4. Deploy with Docker
echo 5. Deploy to AWS
echo 6. Back to Main Menu
echo.
set /p deploy_choice="Enter your choice (1-6): "

if "%deploy_choice%"=="1" (
    echo Deploying to Vercel...
    vercel --prod
) else if "%deploy_choice%"=="2" (
    echo Deploying to Netlify...
    netlify deploy --prod --dir=dist
) else if "%deploy_choice%"=="3" (
    echo Deploying to Railway...
    railway up
) else if "%deploy_choice%"=="4" (
    echo Building and deploying Docker image...
    docker build -t roundabout .
    docker run -p 80:80 roundabout
) else if "%deploy_choice%"=="5" (
    echo Deploying to AWS S3 + CloudFront...
    aws s3 sync dist/ s3://your-bucket-name --delete
    aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
) else if "%deploy_choice%"=="6" (
    goto menu
) else (
    echo Invalid choice.
)
pause
goto menu

:setup
echo.
echo Setting up development environment...
echo.
echo Checking Node.js version...
node --version
echo.
echo Checking npm version...
npm --version
echo.
echo Installing dependencies...
npm install
echo.
echo Copying environment template...
if not exist ".env" (
    copy ".env.example" ".env"
    echo .env file created. Please configure your environment variables.
) else (
    echo .env file already exists.
)
echo.
echo Setting up Git hooks...
npx husky install
echo.
echo Development environment setup complete!
echo Please configure your .env file with proper credentials.
pause
goto menu

:docs
cls
echo.
echo ========================================
echo         Documentation Viewer
echo ========================================
echo.
echo 1. Open README
echo 2. Open Setup Guide
echo 3. Open Deployment Guide
echo 4. Open API Documentation
echo 5. Open Testing Guide
echo 6. View Audit Report
echo 7. Open All Documentation
echo 8. Back to Main Menu
echo.
set /p docs_choice="Enter your choice (1-8): "

if "%docs_choice%"=="1" (
    start docs\README.md
) else if "%docs_choice%"=="2" (
    start docs\setup.md
) else if "%docs_choice%"=="3" (
    start docs\deployment.md
) else if "%docs_choice%"=="4" (
    start docs\api.md
) else if "%docs_choice%"=="5" (
    start docs\testing.md
) else if "%docs_choice%"=="6" (
    start docs\audit_report.md
) else if "%docs_choice%"=="7" (
    start docs\
) else if "%docs_choice%"=="8" (
    goto menu
) else (
    echo Invalid choice.
)
pause
goto menu

:database
cls
echo.
echo ========================================
echo        Database Management
echo ========================================
echo.
echo 1. Start Local Database
echo 2. Run Migrations
echo 3. Seed Database
echo 4. Reset Database
echo 5. Create Backup
echo 6. View Database Status
echo 7. Back to Main Menu
echo.
set /p db_choice="Enter your choice (1-7): "

if "%db_choice%"=="1" (
    echo Starting local Supabase...
    supabase start
) else if "%db_choice%"=="2" (
    echo Running database migrations...
    supabase db push
) else if "%db_choice%"=="3" (
    echo Seeding database with sample data...
    npm run db:seed
) else if "%db_choice%"=="4" (
    echo Resetting database...
    supabase db reset
) else if "%db_choice%"=="5" (
    echo Creating database backup...
    npm run db:backup
) else if "%db_choice%"=="6" (
    echo Checking database status...
    supabase status
) else if "%db_choice%"=="7" (
    goto menu
) else (
    echo Invalid choice.
)
pause
goto menu

:performance
echo.
echo Running performance analysis...
echo.
echo Building production bundle...
npm run build
echo.
echo Analyzing bundle size...
npm run build:analyze
echo.
echo Running Lighthouse audit...
npm run lighthouse
echo.
echo Performance analysis complete! Check the reports folder.
pause
goto menu

:security
echo.
echo Running security audit...
echo.
echo Checking for vulnerabilities...
npm audit
echo.
echo Running security linting...
npm run lint:security
echo.
echo Checking for secrets in code...
npm run check:secrets
echo.
echo Security audit complete! Check the reports folder.
pause
goto menu

:exit
echo.
echo Thank you for using RoundAbout Platform Launcher!
echo.
pause
exit

:error
echo.
echo An error occurred. Please check your configuration and try again.
pause
goto menu
