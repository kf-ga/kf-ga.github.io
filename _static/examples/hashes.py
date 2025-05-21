import hashlib
import bcrypt
import time
from argon2 import PasswordHasher
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
from cryptography.exceptions import InvalidKey
from cryptography.hazmat.backends import default_backend
import os
from itertools import product
import base64
import re

# Hashing functions

# sha256
def hash_sha256(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_sha256(password, hashed):
    return hash_sha256(password) == hashed

#scrypt
def hash_scrypt(password, log2_n):
    R, P, SALT_LEN, DK_LEN = 8, 1, 16, 32

    salt = os.urandom(SALT_LEN)
    dk = Scrypt(salt=salt, length=DK_LEN, n=1 << log2_n, r=R, p=P).derive(password.encode())

    salt_b64 = base64.urlsafe_b64encode(salt).rstrip(b"=").decode()
    dk_b64   = base64.urlsafe_b64encode(dk).rstrip(b"=").decode()

    # create the PHC string
    return f"$scrypt$ln={log2_n},r={R},p={P}${salt_b64}${dk_b64}"

def verify_scrypt(password, phc):
    _PHCRE = re.compile(r"^\$scrypt\$ln=(\d+),r=(\d+),p=(\d+)\$([^$]+)\$([^$]+)$")
    m = _PHCRE.match(phc)
    if not m:
        raise ValueError("malformed scrypt hash")

    ln, r, p = map(int, m.group(1, 2, 3))
    salt_b64, dk_b64 = m.group(4), m.group(5)

    # inline padding restoration + decode
    pad = lambda s: s + "=" * (-len(s) % 4)
    salt     = base64.urlsafe_b64decode(pad(salt_b64))
    dk_stored = base64.urlsafe_b64decode(pad(dk_b64))

    kdf = Scrypt(salt=salt, length=len(dk_stored), n=1 << ln, r=r, p=p,
                 backend=default_backend())
    try:
        kdf.verify(password.encode(), dk_stored)
        return True
    except InvalidKey:
        return False
  
def hash_scrypt_n2e14(password):
    return hash_scrypt(password, log2_n=14)

def hash_scrypt_n2e15(password):
    return hash_scrypt(password, log2_n=15)

def hash_scrypt_n2e16(password):
    return hash_scrypt(password, log2_n=16)

#bcrypt
def hash_bcrypt(password, rounds):
    salt = bcrypt.gensalt(rounds=rounds)
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed.decode()

def verify_bcrypt(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed.encode())

def hash_bcrypt_rounds12(password):
    return hash_bcrypt(password, rounds=12)

def hash_bcrypt_rounds13(password):
    return hash_bcrypt(password, rounds=13)

def hash_bcrypt_rounds14(password):
    return hash_bcrypt(password, rounds=14)

#argon2
def hash_argon2(password, time_cost=2, memory_cost=102400, parallelism=8):
    ph = PasswordHasher(time_cost=time_cost, memory_cost=memory_cost, parallelism=parallelism)
    return ph.hash(password)

def verify_argon2(password, hashed):
    ph = PasswordHasher()
    try:
        ph.verify(hashed, password)
        return True
    except Exception:
        return False
    
def hash_argon2_time_cost2(password):
    return hash_argon2(password, time_cost=2)

def hash_argon2_time_cost3(password):
    return hash_argon2(password, time_cost=3)

def hash_argon2_time_cost4(password):
    return hash_argon2(password, time_cost=4)

# Check hashing and verifying works
def create_hash_verification_table(hash_functions, password):
    print("")
    print(f"{'Hash verification':<30}{'Hash':<100}{'Verified':<10}")
    print("-" * 140)

    for hash_func, verify_func in hash_functions:
        hashed = hash_func(password)
        verified = verify_func(password, hashed)
        print(f"{hash_func.__name__:<30}{hashed[:100]:<100}{'yes' if verified else 'no':<10}")


# Test function to measure time
def measure_hashing_time(hash_functions, n=20):
    passwords = [f"password{i}" for i in range(n)]
    results = []
    print("")
    print(f"{'Hashing time':<30}{'Time (seconds)':<15}")
    print("-" * 45)
    for hash_func, verify_func in hash_functions:
        start_time = time.time()
        for password in passwords:
            hash_func(password)
        elapsed_time = (time.time() - start_time) / n
        print(f"{hash_func.__name__:<30}{elapsed_time:<15.6f}")

# Brute-force cracking function
def bruteforce_crack(verify_function, hashed_password, charset, max_length):
    for length in range(1, max_length + 1):
        for attempt in product(charset, repeat=length):
            candidate = ''.join(attempt)
            if verify_function(candidate, hashed_password):
                return candidate
    return None

def measure_cracking_time(hash_functions):
    charset = "abcdefghijklmnopqrstuvwxyz"
    password = "db"

    print("")
    print(f"{'Cracking hash':<30}{'Time (seconds)':<15}{'Success':<10}")
    print("-" * 60)
    for hash_func, verify_func in hash_functions:
        hashed_password = hash_func(password)
        start_time = time.time()
        cracked_password = bruteforce_crack(verify_func, hashed_password, charset, max_length=3)
        elapsed_time = time.time() - start_time
        success = cracked_password == password
        print(f"{hash_func.__name__:<30}{elapsed_time:<15.6f}{success:<10}{cracked_password}")

if __name__ == "__main__":
    hash_functions = [
        (hash_sha256, verify_sha256),
        (hash_scrypt_n2e14, verify_scrypt),
        (hash_scrypt_n2e15, verify_scrypt),
        (hash_scrypt_n2e16, verify_scrypt),
        (hash_bcrypt_rounds12, verify_bcrypt),
        (hash_bcrypt_rounds13, verify_bcrypt),
        (hash_bcrypt_rounds14, verify_bcrypt),
        (hash_argon2_time_cost2, verify_argon2),
        (hash_argon2_time_cost3, verify_argon2),
        (hash_argon2_time_cost4, verify_argon2),
    ]

    create_hash_verification_table(hash_functions, "neco1234")
    measure_hashing_time(hash_functions)
    measure_cracking_time(hash_functions)