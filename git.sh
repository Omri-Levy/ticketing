echo "Commit message:"
read -r MESSAGE
git add .
git commit -m "$MESSAGE"
git push
