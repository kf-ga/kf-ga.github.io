HTTPS
=====

todo:
## Jak funguje HTTPS

HTTPS (HyperText Transfer Protocol Secure) je rozšíření HTTP, které používá šifrování pomocí SSL/TLS k zabezpečení komunikace mezi klientem a serverem. HTTPS zajišťuje, že data přenášená mezi klientem a serverem jsou šifrována a chráněna před odposlechem a útoky typu man-in-the-middle.

## Jak fungují certifikáty

Certifikáty jsou digitální dokumenty, které ověřují identitu webového serveru. Certifikát obsahuje veřejný klíč serveru a je podepsán certifikační autoritou (CA), která potvrzuje, že server je tím, za koho se vydává. Když klient naváže spojení se serverem, server pošle svůj certifikát klientovi, který ověří jeho platnost pomocí veřejného klíče CA.

## Certifikační autority

Certifikační autority (CA) jsou důvěryhodné organizace, které vydávají a spravují digitální certifikáty. CA ověřují identitu žadatelů o certifikát a podepisují jejich certifikáty, čímž zajišťují důvěryhodnost a bezpečnost komunikace. Příklady známých CA jsou Let's Encrypt, DigiCert a Comodo.

## Nastavení webového serveru Nginx pro podporu HTTPS pomocí Certbot a Let's Encrypt

1. Nainstalujte Certbot:
    ```bash
    sudo apt update
    sudo apt install certbot python3-certbot-nginx
    ```

2. Získejte certifikát od Let's Encrypt:
    ```bash
    sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```

3. Certbot automaticky upraví konfiguraci Nginx a přidá potřebné direktivy pro HTTPS. Konfigurace by měla vypadat následovně:
    ```nginx
    server {
         listen 80;
         server_name yourdomain.com www.yourdomain.com;
         return 301 https://$host$request_uri;
    }

    server {
         listen 443 ssl;
         server_name yourdomain.com www.yourdomain.com;

         ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

         location / {
              proxy_pass http://localhost:3000;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
         }
    }
    ```

4. Restartujte Nginx, aby se změny projevily:
    ```bash
    sudo systemctl restart nginx
    ```

5. Ověřte, že je HTTPS správně nastaveno a funguje:
    ```bash
    sudo certbot renew --dry-run
    ```

Tímto způsobem nastavíte svůj webový server Nginx tak, aby podporoval HTTPS pomocí Certbot a Let's Encrypt.