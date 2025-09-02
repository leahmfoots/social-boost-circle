
#!/bin/bash

# RoundAbout Platform Launcher Script
# Interactive menu for development, testing, and deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to print banner
print_banner() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "      RoundAbout Platform Launcher"
    print_color $CYAN "=========================================="
    echo
}

# Function to check prerequisites
check_prerequisites() {
    print_color $YELLOW "Checking prerequisites..."
    
    # Check Node.js
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_color $GREEN "✓ Node.js: $NODE_VERSION"
    else
        print_color $RED "✗ Node.js not found. Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_color $GREEN "✓ npm: $NPM_VERSION"
    else
        print_color $RED "✗ npm not found"
        exit 1
    fi
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        print_color $GREEN "✓ Dependencies installed"
    else
        print_color $YELLOW "! Dependencies not installed. Run option 5 first."
    fi
    
    echo
}

# Main menu function
show_menu() {
    print_banner
    check_prerequisites
    
    print_color $BLUE "Please select an option:"
    echo
    echo "1.  🚀 Start Development Server"
    echo "2.  🏗️  Build for Production"
    echo "3.  🧪 Run Tests"
    echo "4.  🌐 Deploy to Production"
    echo "5.  ⚙️  Setup Development Environment"
    echo "6.  📚 View Documentation"
    echo "7.  🗄️  Database Management"
    echo "8.  ⚡ Performance Analysis"
    echo "9.  🔒 Security Audit"
    echo "10. 🐳 Docker Management"
    echo "11. 📊 Project Statistics"
    echo "12. 🔧 Development Tools"
    echo "0.  ❌ Exit"
    echo
    read -p "Enter your choice (0-12): " choice
}

# Development server function
start_dev() {
    print_color $GREEN "Starting development server..."
    echo
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_color $YELLOW "Warning: .env file not found. Creating from template..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_color $YELLOW "Please configure your .env file and restart."
            return
        fi
    fi
    
    npm run dev
}

# Build function
build_production() {
    print_color $GREEN "Building for production..."
    echo
    
    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
        print_color $YELLOW "Cleaned previous build"
    fi
    
    # Run build
    npm run build
    
    echo
    print_color $GREEN "✓ Build completed successfully!"
    print_color $CYAN "Built files are in the 'dist' directory"
    
    # Show build size
    if [ -d "dist" ]; then
        BUILD_SIZE=$(du -sh dist | cut -f1)
        print_color $CYAN "Build size: $BUILD_SIZE"
    fi
}

# Test menu function
test_menu() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "            Test Management"
    print_color $CYAN "=========================================="
    echo
    echo "1. 🧪 Run All Tests"
    echo "2. 🔬 Run Unit Tests Only"
    echo "3. 🎭 Run E2E Tests Only"
    echo "4. 📊 Run Tests with Coverage"
    echo "5. 👁️  Run Visual Regression Tests"
    echo "6. 🚀 Run Performance Tests"
    echo "7. 🔍 Run Lint Tests"
    echo "8. 📱 Run Mobile Tests"
    echo "9. ⬅️  Back to Main Menu"
    echo
    read -p "Enter your choice (1-9): " test_choice
    
    case $test_choice in
        1)
            print_color $GREEN "Running all tests..."
            npm run test:all
            ;;
        2)
            print_color $GREEN "Running unit tests..."
            npm run test:unit
            ;;
        3)
            print_color $GREEN "Running E2E tests..."
            npm run test:e2e
            ;;
        4)
            print_color $GREEN "Running tests with coverage..."
            npm run test:coverage
            ;;
        5)
            print_color $GREEN "Running visual regression tests..."
            npm run test:visual
            ;;
        6)
            print_color $GREEN "Running performance tests..."
            npm run test:performance
            ;;
        7)
            print_color $GREEN "Running lint tests..."
            npm run lint
            ;;
        8)
            print_color $GREEN "Running mobile tests..."
            npm run test:mobile
            ;;
        9)
            return
            ;;
        *)
            print_color $RED "Invalid choice"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Deploy menu function
deploy_menu() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "         Deployment Options"
    print_color $CYAN "=========================================="
    echo
    echo "1. 🚀 Deploy to Vercel"
    echo "2. 🌐 Deploy to Netlify"
    echo "3. 🚂 Deploy to Railway"
    echo "4. 🐳 Deploy with Docker"
    echo "5. ☁️  Deploy to AWS"
    echo "6. 🔵 Deploy to Azure"
    echo "7. 🟢 Deploy to Google Cloud"
    echo "8. 📱 Deploy PWA"
    echo "9. ⬅️  Back to Main Menu"
    echo
    read -p "Enter your choice (1-9): " deploy_choice
    
    case $deploy_choice in
        1)
            print_color $GREEN "Deploying to Vercel..."
            if command -v vercel >/dev/null 2>&1; then
                vercel --prod
            else
                print_color $RED "Vercel CLI not installed. Installing..."
                npm install -g vercel
                vercel --prod
            fi
            ;;
        2)
            print_color $GREEN "Deploying to Netlify..."
            if command -v netlify >/dev/null 2>&1; then
                npm run build
                netlify deploy --prod --dir=dist
            else
                print_color $RED "Netlify CLI not installed. Installing..."
                npm install -g netlify-cli
                npm run build
                netlify deploy --prod --dir=dist
            fi
            ;;
        3)
            print_color $GREEN "Deploying to Railway..."
            if command -v railway >/dev/null 2>&1; then
                railway up
            else
                print_color $RED "Railway CLI not installed. Please install it first."
            fi
            ;;
        4)
            print_color $GREEN "Building and deploying Docker image..."
            docker build -t roundabout .
            echo "Docker image built successfully!"
            echo "To run: docker run -p 80:80 roundabout"
            ;;
        5)
            print_color $GREEN "Deploying to AWS S3 + CloudFront..."
            npm run build
            if command -v aws >/dev/null 2>&1; then
                aws s3 sync dist/ s3://your-bucket-name --delete
                aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
            else
                print_color $RED "AWS CLI not installed"
            fi
            ;;
        6)
            print_color $GREEN "Deploying to Azure Static Web Apps..."
            if command -v swa >/dev/null 2>&1; then
                swa deploy --env production
            else
                print_color $RED "Azure Static Web Apps CLI not installed"
            fi
            ;;
        7)
            print_color $GREEN "Deploying to Google Cloud..."
            if command -v gcloud >/dev/null 2>&1; then
                gcloud app deploy
            else
                print_color $RED "Google Cloud CLI not installed"
            fi
            ;;
        8)
            print_color $GREEN "Building and deploying PWA..."
            npm run build:pwa
            echo "PWA build complete with service worker and manifest!"
            ;;
        9)
            return
            ;;
        *)
            print_color $RED "Invalid choice"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Setup function
setup_environment() {
    print_color $GREEN "Setting up development environment..."
    echo
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)
    
    if [ $MAJOR_VERSION -lt 18 ]; then
        print_color $RED "Node.js version 18 or higher required. Current: $NODE_VERSION"
        print_color $YELLOW "Please update Node.js and run setup again."
        return
    fi
    
    print_color $GREEN "✓ Node.js version $NODE_VERSION is compatible"
    
    # Install dependencies
    print_color $YELLOW "Installing dependencies..."
    npm install
    
    # Copy environment file
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_color $GREEN "✓ Environment file created (.env)"
            print_color $YELLOW "⚠️  Please configure your environment variables in .env"
        else
            print_color $RED "✗ .env.example not found"
        fi
    else
        print_color $CYAN "✓ Environment file already exists"
    fi
    
    # Setup Git hooks
    if [ -d ".git" ]; then
        print_color $YELLOW "Setting up Git hooks..."
        npx husky install 2>/dev/null || true
        print_color $GREEN "✓ Git hooks configured"
    fi
    
    # Create necessary directories
    mkdir -p logs reports coverage
    print_color $GREEN "✓ Created necessary directories"
    
    # Check Supabase CLI
    if command -v supabase >/dev/null 2>&1; then
        print_color $GREEN "✓ Supabase CLI is available"
    else
        print_color $YELLOW "Installing Supabase CLI..."
        npm install -g supabase
    fi
    
    echo
    print_color $GREEN "🎉 Development environment setup complete!"
    echo
    print_color $CYAN "Next steps:"
    echo "1. Configure your .env file with proper credentials"
    echo "2. Start the development server (option 1)"
    echo "3. Run the test suite (option 3)"
    
    echo
    read -p "Press Enter to continue..."
}

# Documentation function
view_docs() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "         Documentation Viewer"
    print_color $CYAN "=========================================="
    echo
    echo "1. 📖 README"
    echo "2. ⚙️  Setup Guide"
    echo "3. 🚀 Deployment Guide"
    echo "4. 🔧 Configuration Guide"
    echo "5. 🧪 Testing Guide"
    echo "6. 🔒 Security Documentation"
    echo "7. 📊 Audit Report"
    echo "8. 💾 API Documentation"
    echo "9. 📁 Open Documentation Folder"
    echo "10. ⬅️ Back to Main Menu"
    echo
    read -p "Enter your choice (1-10): " docs_choice
    
    case $docs_choice in
        1) open_file "docs/README.md" ;;
        2) open_file "docs/setup.md" ;;
        3) open_file "docs/deployment.md" ;;
        4) open_file "docs/config.md" ;;
        5) open_file "docs/testing.md" ;;
        6) open_file "docs/security.md" ;;
        7) open_file "docs/audit_report.md" ;;
        8) open_file "docs/api.md" ;;
        9) 
            if command -v open >/dev/null 2>&1; then
                open docs/
            elif command -v xdg-open >/dev/null 2>&1; then
                xdg-open docs/
            else
                print_color $CYAN "Documentation is in the 'docs/' folder"
            fi
            ;;
        10) return ;;
        *) print_color $RED "Invalid choice" ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Helper function to open files
open_file() {
    local file=$1
    if [ -f "$file" ]; then
        if command -v open >/dev/null 2>&1; then
            open "$file"
        elif command -v xdg-open >/dev/null 2>&1; then
            xdg-open "$file"
        else
            print_color $CYAN "Please open: $file"
        fi
    else
        print_color $RED "File not found: $file"
    fi
}

# Database management function
database_menu() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "        Database Management"
    print_color $CYAN "=========================================="
    echo
    echo "1. 🚀 Start Local Database"
    echo "2. 📊 Check Database Status"
    echo "3. 🔄 Run Migrations"
    echo "4. 🌱 Seed Database"
    echo "5. 🔄 Reset Database"
    echo "6. 💾 Create Backup"
    echo "7. 📥 Restore Backup"
    echo "8. 🔍 View Database Logs"
    echo "9. ⬅️  Back to Main Menu"
    echo
    read -p "Enter your choice (1-9): " db_choice
    
    case $db_choice in
        1)
            print_color $GREEN "Starting local Supabase..."
            supabase start
            ;;
        2)
            print_color $GREEN "Checking database status..."
            supabase status
            ;;
        3)
            print_color $GREEN "Running database migrations..."
            supabase db push
            ;;
        4)
            print_color $GREEN "Seeding database with sample data..."
            npm run db:seed
            ;;
        5)
            print_color $YELLOW "⚠️  This will reset all data. Are you sure? (y/N)"
            read -p "" confirm
            if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
                print_color $GREEN "Resetting database..."
                supabase db reset
            else
                print_color $CYAN "Operation cancelled"
            fi
            ;;
        6)
            print_color $GREEN "Creating database backup..."
            BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
            npm run db:backup "$BACKUP_FILE"
            print_color $GREEN "✓ Backup created: $BACKUP_FILE"
            ;;
        7)
            print_color $YELLOW "Available backups:"
            ls -la *.sql 2>/dev/null || echo "No backup files found"
            read -p "Enter backup filename to restore: " backup_file
            if [ -f "$backup_file" ]; then
                npm run db:restore "$backup_file"
            else
                print_color $RED "Backup file not found"
            fi
            ;;
        8)
            print_color $GREEN "Viewing database logs..."
            supabase logs -f
            ;;
        9)
            return
            ;;
        *)
            print_color $RED "Invalid choice"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Performance analysis function
performance_analysis() {
    print_color $GREEN "Running performance analysis..."
    echo
    
    print_color $YELLOW "Building production bundle..."
    npm run build
    
    echo
    print_color $YELLOW "Analyzing bundle size..."
    npm run build:analyze
    
    echo
    print_color $YELLOW "Running Lighthouse audit..."
    npm run lighthouse || print_color $YELLOW "Lighthouse not configured"
    
    echo
    print_color $YELLOW "Checking dependencies for vulnerabilities..."
    npm audit --audit-level moderate
    
    echo
    print_color $YELLOW "Analyzing code complexity..."
    npx madge --circular src/ || print_color $YELLOW "Madge not installed"
    
    echo
    print_color $GREEN "✓ Performance analysis complete!"
    print_color $CYAN "Check the 'reports' folder for detailed results"
    
    echo
    read -p "Press Enter to continue..."
}

# Security audit function
security_audit() {
    print_color $GREEN "Running comprehensive security audit..."
    echo
    
    print_color $YELLOW "1. Checking for known vulnerabilities..."
    npm audit --audit-level high
    
    echo
    print_color $YELLOW "2. Running security linting..."
    npm run lint:security 2>/dev/null || print_color $YELLOW "Security linter not configured"
    
    echo
    print_color $YELLOW "3. Checking for secrets in code..."
    if command -v truffleHog >/dev/null 2>&1; then
        truffleHog filesystem .
    else
        grep -r -i "password\|secret\|key\|token" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v "// " || print_color $GREEN "No exposed secrets found"
    fi
    
    echo
    print_color $YELLOW "4. Checking file permissions..."
    find . -name "*.env*" -exec ls -la {} \;
    
    echo
    print_color $YELLOW "5. Validating dependencies..."
    npm ls --depth=0 | grep -E "(WARN|ERR)" || print_color $GREEN "All dependencies valid"
    
    echo
    print_color $GREEN "✓ Security audit complete!"
    
    echo
    read -p "Press Enter to continue..."
}

# Docker management function
docker_menu() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "         Docker Management"
    print_color $CYAN "=========================================="
    echo
    echo "1. 🐳 Build Docker Image"
    echo "2. 🚀 Run Docker Container"
    echo "3. 📊 View Running Containers"
    echo "4. 🛑 Stop All Containers"
    echo "5. 🧹 Clean Up Images"
    echo "6. 📝 View Container Logs"
    echo "7. 🔧 Docker Compose Up"
    echo "8. 🔧 Docker Compose Down"
    echo "9. ⬅️  Back to Main Menu"
    echo
    read -p "Enter your choice (1-9): " docker_choice
    
    case $docker_choice in
        1)
            print_color $GREEN "Building Docker image..."
            docker build -t roundabout:latest .
            ;;
        2)
            print_color $GREEN "Running Docker container..."
            docker run -d -p 80:80 --name roundabout-app roundabout:latest
            print_color $CYAN "Container running at http://localhost"
            ;;
        3)
            print_color $GREEN "Viewing running containers..."
            docker ps
            ;;
        4)
            print_color $GREEN "Stopping all containers..."
            docker stop $(docker ps -q) 2>/dev/null || print_color $YELLOW "No running containers"
            ;;
        5)
            print_color $GREEN "Cleaning up unused images..."
            docker image prune -f
            ;;
        6)
            read -p "Enter container name or ID: " container_id
            docker logs -f "$container_id"
            ;;
        7)
            print_color $GREEN "Starting services with Docker Compose..."
            docker-compose up -d
            ;;
        8)
            print_color $GREEN "Stopping Docker Compose services..."
            docker-compose down
            ;;
        9)
            return
            ;;
        *)
            print_color $RED "Invalid choice"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Project statistics function
project_stats() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "         Project Statistics"
    print_color $CYAN "=========================================="
    echo
    
    print_color $YELLOW "📁 Code Statistics:"
    if command -v cloc >/dev/null 2>&1; then
        cloc src/ --exclude-dir=node_modules
    else
        find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | wc -l | xargs echo "Total files:"
        find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs wc -l | tail -1
    fi
    
    echo
    print_color $YELLOW "📦 Dependencies:"
    npm list --depth=0 2>/dev/null | grep -c "─" | xargs echo "Total packages:"
    
    echo
    print_color $YELLOW "🧪 Test Coverage:"
    npm run test:coverage --silent 2>/dev/null || print_color $RED "Run tests to see coverage"
    
    echo
    print_color $YELLOW "📊 Bundle Size:"
    if [ -d "dist" ]; then
        du -sh dist | cut -f1 | xargs echo "Build size:"
    else
        print_color $RED "No build found. Run 'npm run build' first"
    fi
    
    echo
    print_color $YELLOW "🔒 Security Status:"
    npm audit --audit-level high --json 2>/dev/null | jq '.metadata.vulnerabilities.high // 0' 2>/dev/null | xargs echo "High vulnerabilities:" || echo "Audit data not available"
    
    echo
    print_color $YELLOW "📈 Git Statistics:"
    if [ -d ".git" ]; then
        git rev-list --all --count | xargs echo "Total commits:"
        git shortlog -sn | wc -l | xargs echo "Contributors:"
        git log --since="1 month ago" --oneline | wc -l | xargs echo "Commits this month:"
    else
        print_color $RED "Not a Git repository"
    fi
    
    echo
    read -p "Press Enter to continue..."
}

# Development tools function
dev_tools() {
    clear
    print_color $CYAN "=========================================="
    print_color $CYAN "         Development Tools"
    print_color $CYAN "=========================================="
    echo
    echo "1. 🔍 Run ESLint"
    echo "2. 🎨 Format Code (Prettier)"
    echo "3. 🔧 Fix Linting Issues"
    echo "4. 📦 Update Dependencies"
    echo "5. 🧹 Clean Project"
    echo "6. 🔄 Reset Node Modules"
    echo "7. 📊 Generate Changelog"
    echo "8. 🏷️  Version Bump"
    echo "9. ⬅️  Back to Main Menu"
    echo
    read -p "Enter your choice (1-9): " tools_choice
    
    case $tools_choice in
        1)
            print_color $GREEN "Running ESLint..."
            npm run lint
            ;;
        2)
            print_color $GREEN "Formatting code with Prettier..."
            npm run format
            ;;
        3)
            print_color $GREEN "Fixing linting issues..."
            npm run lint:fix
            ;;
        4)
            print_color $GREEN "Checking for dependency updates..."
            npx npm-check-updates
            read -p "Update all dependencies? (y/N): " update_deps
            if [ "$update_deps" = "y" ]; then
                npx npm-check-updates -u
                npm install
            fi
            ;;
        5)
            print_color $GREEN "Cleaning project..."
            rm -rf dist coverage reports .vite
            print_color $GREEN "✓ Project cleaned"
            ;;
        6)
            print_color $YELLOW "This will remove node_modules and reinstall. Continue? (y/N)"
            read -p "" confirm_reset
            if [ "$confirm_reset" = "y" ]; then
                rm -rf node_modules package-lock.json
                npm install
                print_color $GREEN "✓ Node modules reset"
            fi
            ;;
        7)
            print_color $GREEN "Generating changelog..."
            npx auto-changelog -p || print_color $YELLOW "auto-changelog not configured"
            ;;
        8)
            echo "Select version bump type:"
            echo "1. Patch (1.0.0 -> 1.0.1)"
            echo "2. Minor (1.0.0 -> 1.1.0)"  
            echo "3. Major (1.0.0 -> 2.0.0)"
            read -p "Enter choice (1-3): " version_type
            case $version_type in
                1) npm version patch ;;
                2) npm version minor ;;
                3) npm version major ;;
                *) print_color $RED "Invalid choice" ;;
            esac
            ;;
        9)
            return
            ;;
        *)
            print_color $RED "Invalid choice"
            ;;
    esac
    
    echo
    read -p "Press Enter to continue..."
}

# Main program loop
main() {
    while true; do
        show_menu
        
        case $choice in
            1) start_dev ;;
            2) build_production ;;
            3) test_menu ;;
            4) deploy_menu ;;
            5) setup_environment ;;
            6) view_docs ;;
            7) database_menu ;;
            8) performance_analysis ;;
            9) security_audit ;;
            10) docker_menu ;;
            11) project_stats ;;
            12) dev_tools ;;
            0) 
                print_color $GREEN "Thank you for using RoundAbout Platform Launcher!"
                echo
                exit 0
                ;;
            *)
                print_color $RED "Invalid choice. Please try again."
                sleep 2
                ;;
        esac
        
        if [ "$choice" != "0" ]; then
            echo
            read -p "Press Enter to return to main menu..."
        fi
    done
}

# Make script executable and run
chmod +x "$0"
main
