#!/usr/bin/env python3
"""
Daily commit automation script
Makes 1-5 random commits to maintain activity
"""

import random
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# Configuration
REPO_PATH = Path(__file__).parent.absolute()
LOG_FILE = REPO_PATH / "activity_log.txt"
GIT_USER_NAME = "karamvirsingh1998"
GIT_USER_EMAIL = "karamvirh71@gmail.com"


def run_git_command(command):
    """Run a git command and return the result"""
    try:
        result = subprocess.run(
            command,
            cwd=REPO_PATH,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running git command: {e}")
        print(f"Output: {e.output}")
        return None


def make_commit(commit_number, total_commits):
    """Make a single commit with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Append to log file
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] Commit {commit_number}/{total_commits}\n")
    
    # Configure git user for this repo
    run_git_command(["git", "config", "user.name", GIT_USER_NAME])
    run_git_command(["git", "config", "user.email", GIT_USER_EMAIL])
    
    # Stage the file
    run_git_command(["git", "add", "activity_log.txt"])
    
    # Commit
    commit_message = f"Daily activity update {timestamp} ({commit_number}/{total_commits})"
    result = run_git_command(["git", "commit", "-m", commit_message])
    
    if result:
        print(f"✓ Commit {commit_number}/{total_commits} successful")
        return True
    else:
        print(f"✗ Commit {commit_number}/{total_commits} failed")
        return False


def main():
    """Main function to make random number of commits"""
    # Generate random number of commits (1-5)
    num_commits = random.randint(1, 5)
    
    print(f"🚀 Starting daily commit automation")
    print(f"📊 Will make {num_commits} commit(s)")
    print(f"📁 Repository: {REPO_PATH}")
    print(f"👤 User: {GIT_USER_NAME} <{GIT_USER_EMAIL}>")
    print("-" * 50)
    
    # Check if we're in a git repo
    if not (REPO_PATH / ".git").exists():
        print("⚠️  Not a git repository! Initializing...")
        run_git_command(["git", "init"])
    
    # Make the commits
    successful_commits = 0
    for i in range(1, num_commits + 1):
        if make_commit(i, num_commits):
            successful_commits += 1
    
    print("-" * 50)
    print(f"✅ Completed: {successful_commits}/{num_commits} commits successful")
    
    # Push to remote if configured
    result = run_git_command(["git", "remote", "get-url", "origin"])
    if result and result.strip():
        print("\n🔄 Pushing to remote...")
        # Get current branch name
        branch_result = run_git_command(["git", "branch", "--show-current"])
        branch = branch_result.strip() if branch_result else "main"
        
        push_result = run_git_command(["git", "push", "origin", branch])
        if push_result is not None:
            print("✅ Push successful")
        else:
            print("⚠️  Push failed - you may need to push manually")
    else:
        print("\n⚠️  No remote configured. Add remote with:")
        print("   git remote add origin <your-repo-url>")
    
    return 0 if successful_commits > 0 else 1


if __name__ == "__main__":
    sys.exit(main())

