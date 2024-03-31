HOME=/home/ubuntu
REPOSITORY=jigglogsocket

now_time=`date`
echo "[$now_time] --- 소켓 배포 BEFORE ---" >> /home/ubuntu/log.txt

# 1. 이전 폴더 삭제
now_time=`date`
echo "[$now_time] 1) 이전 폴더 확인 후 있으면 삭제" >> /home/ubuntu/log.txt

cd ${HOME} >> /home/ubuntu/log.txt
# 폴더 여부 확인하고 있으면 삭제
if [ -d ./$REPOSITORY ]; then
    rm -rf ./${REPOSITORY} >> /home/ubuntu/log.txt
    now_time=`date`
    echo "[$now_time] 1-1) 이전 폴더 삭제" >> /home/ubuntu/log.txt
fi

# 2. 이전 도커 컨테이너 삭제
now_time=`date`
echo "[$now_time] 2) 이전 도커 컨테이너 삭제" >> /home/ubuntu/log.txt
sudo docker rm -f $REPOSITOR >> /home/ubuntu/log.txt
sudo docker rmi -f ydh2244/${REPOSITORY} >> /home/ubuntu/log.txt

now_time=`date`
echo "[$now_time] --- before deploy 완료 --- " >> /home/ubuntu/log.txt