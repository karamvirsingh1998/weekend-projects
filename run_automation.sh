#!/bin/bash
# Wrapper script for daily commit automation
# This ensures proper environment for launchd execution

# Set PATH
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Set working directory
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects

# Log start time
echo "=== Starting automation at $(date) ===" >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log

# Switch to correct GitHub account
bash /Users/karamvirsingh/Downloads/Repos/gh-switch.sh karamvir >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log 2>&1

# Run the Python script
/usr/bin/python3 /Users/karamvirsingh/Downloads/Repos/weekend-projects/daily_commit.py >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log 2>&1

# Log completion
echo "=== Completed at $(date) ===" >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log
echo "" >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log

exit 0

