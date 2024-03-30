HOME=/home/ubuntu
REPOSITORY=jigglogsocket

now_time=`date`
echo "[$now_time] --- 소켓 배포 AFTER ---" >> /home/ubuntu/log.txt
now_time=`date`
# 시작 로그 기록
echo "[$now_time] 1) after deploy 시작" >> /home/ubuntu/log.txt

cd ${HOME}/${REPOSITORY} || exit >> /home/ubuntu/log.txt

# 소켓 빌드 복사 실행
now_time=`date`
echo "[$now_time] 2) docker pub로 소켓 실행" >> /home/ubuntu/log.txt
docker pull ydh2244/${REPOSITORY} >> /home/ubuntu/log.txt
docker compose -f docker-compose.yml up -d --build  >> /home/ubuntu/log.txt

now_time=`date`
echo "[$now_time] --- 소켓 after deploy 완료 --- " >> /home/ubuntu/log.txt