#!/bin/bash
# Simple daily automation starter
# Run this once, and it will handle daily commits

echo "🚀 Starting Daily Commit Automation Service"
echo "============================================="
echo ""
echo "This will run EVERY DAY at 10:00 AM"
echo "Press Ctrl+C to stop"
echo ""

while true; do
    # Get current time
    CURRENT_HOUR=$(date '+%H')
    CURRENT_MINUTE=$(date '+%M')
    
    # Check if it's 10:00 AM
    if [ "$CURRENT_HOUR" = "10" ] && [ "$CURRENT_MINUTE" = "00" ]; then
        echo "⏰ [$(date)] Running daily automation..."
        cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
        bash /Users/karamvirsingh/Downloads/Repos/gh-switch.sh karamvir > /dev/null 2>&1
        /usr/bin/python3 /Users/karamvirsingh/Downloads/Repos/weekend-projects/daily_commit.py >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log 2>&1
        echo "✅ [$(date)] Automation completed. Waiting for next day..."
        # Sleep for 2 minutes to avoid running multiple times
        sleep 120
    fi
    
    # Check every 30 seconds
    sleep 30
done

