# 7f2k9xq8v3r1

Landing page estática para elegir entre dos regalos de teatro por el Día del Padre.

## Uso local

No requiere dependencias ni proceso de build. Abrir `index.html` directamente en el navegador.

También se puede servir con cualquier servidor estático:

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Deploy con GitHub Pages

1. Subir estos archivos a un repositorio de GitHub.
2. Ir a `Settings` -> `Pages`.
3. En `Build and deployment`, elegir `Deploy from a branch`.
4. Seleccionar branch `main` y carpeta `/root`.
5. Guardar y esperar a que GitHub publique el sitio.

Si se usa GitHub CLI:

```bash
git add index.html styles.css script.js README.md
git commit -m "Create Father's Day gift selector"
git push origin main
```

Después activar Pages desde la configuración del repositorio.

## Fuentes de las obras

- Berlin Berlin: https://www.plateanet.com/obra/34072?obra=BERLIN-BERLIN&paso=inicio
- La Cena de los Tontos: https://www.plateanet.com/obra/33879?obra=LA-CENA-DE-LOS-TONTOS-_&paso=inicio
