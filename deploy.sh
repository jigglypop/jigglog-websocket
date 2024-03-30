docker rm -f ydh2244/jigglogsocket
docker rmi -f ydh2244/jigglogsocket
yarn build
docker build --platform linux/amd64 -t ydh2244/jigglogsocket . &&
docker push ydh2244/jigglogsocket
git add .
now_time=`date`
git commit -m "[$now_time deploy] $1"
git push