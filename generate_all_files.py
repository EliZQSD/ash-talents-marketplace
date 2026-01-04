#!/usr/bin/env python3
"""
ASH Talents Marketplace - Complete File Generator
This script parses CODE_COMPLET.txt and creates ALL files automatically.

Usage:
1. Download this file
2. Place it in the ash-talents-marketplace directory  
3. Make sure CODE_COMPLET.txt is in the same directory
4. Run: python3 generate_all_files.py

The script will create:
- All backend modules (auth, creators, brands, campaigns, deals, payments)
- All frontend files (pages, components, styles)
- Complete project structure
"""

import os
import sys
import re

def create_file(path, content):
    """Create a file with its content"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Created: {path}")

def parse_code_complet():
    """Parse CODE_COMPLET.txt and extract all files"""
    if not os.path.exists('CODE_COMPLET.txt'):
        print("❌ Error: CODE_COMPLET.txt not found!")
        print("Please make sure CODE_COMPLET.txt is in the current directory.")
        sys.exit(1)
    
    with open('CODE_COMPLET.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <br> tags with newlines
    content = content.replace('<br>', '\n')
    
    files = {}
    lines = content.split('\n')
    
    current_file = None
    current_content = []
    
    for line in lines:
        # Check if this is a file path marker
        if line.strip().startswith('---') and line.strip().endswith('---'):
            # Save previous file if exists
            if current_file and current_content:
                files[current_file] = '\n'.join(current_content)
            
            # Extract new file path
            file_match = re.search(r'--- (.+?) ---', line)
            if file_match:
                current_file = file_match.group(1).strip()
                current_content = []
        elif current_file:
            # Skip section headers and empty markers
            if not line.strip().startswith('====='):
                current_content.append(line)
    
    # Save last file
    if current_file and current_content:
        files[current_file] = '\n'.join(current_content)
    
    return files

def generate_all_files():
    """Generate all files from CODE_COMPLET.txt"""
    print("🚀 Generating all ASH Talents Marketplace files...\n")
    
    try:
        files = parse_code_complet()
        
        if not files:
            print("❌ No files found in CODE_COMPLET.txt")
            sys.exit(1)
        
        print(f"📁 Found {len(files)} files to create\n")
        
        for filepath, content in files.items():
            # Clean up the content
            content = content.strip()
            if content:
                create_file(filepath, content)
        
        print("\n✅ All files have been generated!")
        print("\n📝 Next steps:")
        print("1. cd backend && npm install")
        print("2. cd ../frontend && npm install")
        print("3. Follow the DEPLOY.md guide to deploy on Railway and Vercel")
        print("\n🎉 Setup complete!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    generate_all_files()
