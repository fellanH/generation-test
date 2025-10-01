#!/bin/bash

# Bongo AI Studio - Setup Script
# This script helps you set up the development environment

echo "🎨 Bongo AI Studio - Setup Script"
echo "=================================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo "⚠️  Warning: .env file already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping .env creation"
    else
        cp .env.example .env
        echo "✅ Created .env file from .env.example"
    fi
else
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
fi
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
if command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn install
else
    echo "Using npm..."
    npm install
fi
echo "✅ Dependencies installed"
echo ""

# Remind about configuration
echo "⚙️  Configuration Required"
echo "========================="
echo ""
echo "Please edit .env file and add your credentials:"
echo ""
echo "1. Supabase Configuration:"
echo "   - Go to https://supabase.com"
echo "   - Create a new project or use existing"
echo "   - Copy Project URL and API keys"
echo "   - Add to .env file"
echo ""
echo "2. Fal.ai Configuration:"
echo "   - Go to https://fal.ai"
echo "   - Sign up and get API key"
echo "   - Add to .env file"
echo ""
echo "3. Database Setup:"
echo "   - Go to Supabase SQL Editor"
echo "   - Run: supabase/migrations/001_initial_schema.sql"
echo "   - Run: supabase/storage-policies.sql"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "📚 For detailed instructions, see README.md"
echo ""
echo "✅ Setup complete!"
