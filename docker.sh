echo "Service:"
read -r SERVICE
echo "Version:"
read -r VERSION
docker build -t omrilevy0197/"$SERVICE":"$VERSION" "./$SERVICE"
docker push omrilevy0197/"$SERVICE":"$VERSION"
