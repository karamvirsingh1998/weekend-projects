#!/bin/bash
# Setup script for daily commit automation

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PYTHON_SCRIPT="$SCRIPT_DIR/daily_commit.py"

echo "🔧 Setting up daily commit automation"
echo "======================================"

# Make the Python script executable
chmod +x "$PYTHON_SCRIPT"
echo "✓ Made script executable"

# Create initial log file if it doesn't exist
if [ ! -f "$SCRIPT_DIR/activity_log.txt" ]; then
    echo "Creating initial activity log..."
    echo "# Activity Log" > "$SCRIPT_DIR/activity_log.txt"
    echo "Started on $(date)" >> "$SCRIPT_DIR/activity_log.txt"
    echo "" >> "$SCRIPT_DIR/activity_log.txt"
fi

# Check if git repo is initialized
if [ ! -d "$SCRIPT_DIR/.git" ]; then
    echo "Initializing git repository..."
    cd "$SCRIPT_DIR"
    git init
    git config user.name "karamvirsingh1998"
    git config user.email "karamvirh71@gmail.com"
    echo "✓ Git repository initialized"
fi

echo ""
echo "📅 Setting up daily automation with cron"
echo "========================================="

# Create cron job entry (runs daily at 10 AM)
CRON_ENTRY="0 10 * * * cd $SCRIPT_DIR && /usr/bin/python3 $PYTHON_SCRIPT >> $SCRIPT_DIR/cron.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "daily_commit.py"; then
    echo "⚠️  Cron job already exists!"
    echo "Current cron jobs:"
    crontab -l | grep "daily_commit.py"
else
    echo "Adding cron job..."
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
    echo "✓ Cron job added"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Configuration:"
echo "  - Script: $PYTHON_SCRIPT"
echo "  - Schedule: Daily at 10:00 AM"
echo "  - Repository: $SCRIPT_DIR"
echo "  - Log file: $SCRIPT_DIR/cron.log"
echo ""
echo "🔍 To view current cron jobs:"
echo "  crontab -l"
echo ""
echo "✏️  To edit cron schedule:"
echo "  crontab -e"
echo ""
echo "🧪 To test the script now:"
echo "  python3 $PYTHON_SCRIPT"
echo ""
echo "🗑️  To remove the cron job:"
echo "  crontab -l | grep -v 'daily_commit.py' | crontab -"
echo ""

