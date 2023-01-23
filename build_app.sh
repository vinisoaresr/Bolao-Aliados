#build frontend
cd ./frontend
npm ci
GENERATE_SOURCEMAP=false npm run build
# rsync -r -v --progress ./build ./../infra

#build backend
cd ./../backend
mvn clean install -DskipTests
mvn package -DskipTests 
# rsync -r -v --progress ./target ./../infra