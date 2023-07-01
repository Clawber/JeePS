# JeePS
A highly scaleable vehicle fleet monitoring and management system.
Pilot testing ongoing in UP Diliman.

Try the JeePS web app: https://jeeps-view.onrender.com/

Visit our blog: https://www.notion.so/clawber/Project-JeePS-Blog-25d7e6bc7d5e4cee8deb14a305e648f5

You may also find our System Requirements and Maintenance Plan in the blog.

To sign up as an administrator, contact the JeePS developers for the admin key.

---
## Project Development
This section is for those looking to further develop or maintain this project.

Note: Make sure to run the given commands in the root directory of the project.

### Development Setup
1. Install `Node.js` and `npm`. This will be our framework.
2. Install PostgreSQL for local development.
3. Create your own .env file and put it in the project root. The content format should be:
```
SECRET_KEY=<put your secret key here, used in hashing passwords>
ADMIN_KEY=<used for verifying sign up attempts>
APIKEY=<used for directly connecting to database>
DATABASE_URL=<remote PSQL url>
LOCAL_DB_URL=<development PSQL url>
```

4. Afterwards, run this command first to install the dependencies.
```bash
npm install
```
5. Then, start the backend server using:
```bash
# This defaults to port 8080
npm start
```
6. Then, start the frontend development server using:

```bash
npm run dev

# Or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building
---
To preview a production version of your app, run:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. In our case, we have an adapter for Render (see `render.yaml`).

---
**Client and Supervisor</br>**
Dr. Ligaya Leah Figueroa \<llfigueroa@up.edu.ph\>

**Developers**
- Carl David B. Ragunton \<cbragunton@up.edu.ph\>
- John Erick S. Sarenas \<jssarenas@up.edu.ph\>
- Prinz Romeo O. Gan \<pogan3@up.edu.ph\>
- Yenzy Urson S. Hebron \<yshebron@up.edu.ph\>

**CS 192: Software Engineering II</br>**
2nd Semester A.Y. 2022-2023

University of the Philippines Diliman

© Course Materials by Dr. Ligaya Leah Figueroa