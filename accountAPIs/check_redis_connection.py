import redis

def check_redis_connection():
    try:
        redis_host = "redis"
        redis_port = 6379
        connection = redis.StrictRedis(host=redis_host, port=redis_port)
        ping_result = connection.ping()
        return ping_result
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    result = check_redis_connection()
    print(result)

