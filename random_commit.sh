#!/bin/bash
# random_commit.sh
# Randomly makes 0–5 commits per day and pushes them


# Generate random number between 0–5
N=$(( RANDOM % 6 ))
echo "Will make $N commits today."

for ((i=1; i<=N; i++)); do
  # Make a small change so there’s something to commit
  echo "[$(date)] Auto commit #$i" >> log.txt

  # Stage all changes
  git add .

  # Commit with timestamp message
  git commit -m "Auto commit #$i on $(date)"

  # Push to your remote branch
  git push origin main

  echo "✅ Commit #$i pushed."

  # Wait random 5–30 minutes before next commit
  sleep 30
done

