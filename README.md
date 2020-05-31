# imgproxy companion

The purpose of this simple script is to easily integrate https://github.com/imgproxy/imgproxy into applications.

```html
<script src="https://unpkg.com/imgproxy-companion@1.0.3/cdnscript.js"></script>
<script>
  window.imgProxyInit({
    domain: "http://localhost:8080",
    offset: 200
  });
</script>
```

Above will work if you started imgproxy with:

```bash
docker pull darthsim/imgproxy:latest
docker run -p 8080:8080 -it darthsim/imgproxy
```

And offset option is self-explainable.

In production, remember to set caching for resulting images.
