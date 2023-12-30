import json
import socket
import threading
import time
import oracledb

# for pyinstaller with oracledb
try:
    from cryptography.hazmat.primitives.kdf import pbkdf2
    import secrets
    import uuid
except Exception as error:
    pass


def send_data():
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect(("188.247.181.206", 81))
        # client_socket.connect(("127.0.0.1", 81))
        client_socket.sendall(b"await")
        query = client_socket.recv(1024).decode(encoding="utf-8")
        try:
            oracledb.init_oracle_client(lib_dir=r"C:\ADDITIONAL\web_platform\instantclient_21_9_lite")
        except Exception as _:
            pass
        with oracledb.connect("DISPATCHER/disp@172.30.23.16/PITENEW") as connection:
            with connection.cursor() as cursor:
                cursor.execute(query)
                raw_data: list[tuple] = cursor.fetchall()
        client_socket.sendall(json.dumps(raw_data, ensure_ascii=False).encode(encoding="utf-8"))
        client_socket.close()
    except Exception as error:
        pass


def main():
    while True:
        try:
            client_thread = threading.Thread(target=send_data)
            client_thread.start()
        except Exception as error:
            pass
        time.sleep(0.1)


if __name__ == "__main__":
    main()
