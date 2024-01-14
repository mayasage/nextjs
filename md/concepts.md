---
runme:
  id: 01HKQRWV4DP0108F95DGJ9E2Q1
  version: v2.2
---

# Concepts

## Install

```sh {"id":"01HKQER2GCZBRG04ACPPKEW8BD"}
cd code
npx create-react-app@latest routing
```

## Standard Directory Structure

```plaintext {"id":"01HKSFKRH716XS64ETR4X3T77F"}
- root
  - src
    - app (routes with corresponding pages)
    - components (reusable components; exported like pages)
```

## Layout

Layout wraps Page(s)

## Props

```tsx {"id":"01HKQJVWFR7NHCRP9M12XJFXRV"}
// http://localhost:3000/users/profile/69/rose?x=10

/*
69 -> params
rose -> params
x=10 -> searchParams
*/

/*
props only contains { params, searchParams }
Example: { params: { id: '69', name: 'rose' }, searchParams: { x: '10' } }
*/
export default function UserNamePage({ params, searchParams }) {}
```

## Router

### How it works ?

There are 2 types of routers:

- App Router (Src/App)
- Pages Router (Src/Pages)

```plaintext {"id":"01HKQF378NTK56WY97T6ZKSJ0B"}
SRC/APP
  - page.js (www.mydomain.com)
  - CONTACT
    - page.js (www.mydomain.com/contact)
  - USERS
    - page.js (www.mydomain.com/users)
    - PROFILE
      - page.js (www.mydomain.com/users/profile)

SRC/PAGES (Old)
```

```tsx {"id":"01HKQM7Z0G082SKYG16CPQBQV3"}
// src/app/users/profile/page.js

// http://localhost:3000/users/profile/69/rose?x=10

/*
69 -> params
rose -> params
x=10 -> searchParams
*/

/*
props only contains { params, searchParams }
Example: { params: { id: '69', name: 'rose' }, searchParams: { x: '10' } }
*/
export default function UserNamePage({ params, searchParams }) {}
```

### Catchall Route

```plaintext {"id":"01HKQKWHNPWZQP14S8MZYV67H2"}
SRC/APP
  - cars
    - [...slug] (Can be any name)
      - page.js (www.mydomain.com/<anything>)
    - page.js (www.mydomain.com/cars)

If you delete "page.js", "www.mydomain.com/cars" will be 404 Not Found.
Solution:

SRC/APP
  - cars
    - [[...slug]] (Can be any name)
      - page.js (www.mydomain.com/cars; www.mydomain.com/cars/<anything>)
```

```tsx {"id":"01HKQMA3HVVC3GJEABNDZK2E3Z"}
// http://localhost:3000/cars/felicia/lightning?lvl=max

/*
Example: {
  params: { fuck: [ 'felicia', 'lightning' ] },
  searchParams: { lvl: 'max' }
}
*/
export default function CatchAllPage({ params, searchParams }) { }
```

### Parallel Routes

- Components callable by name inside Layout
- In other words, used for conditionally rendering Component inside Layout

```plaintext {"id":"01HKQSG58WKWT5HGTBRBVKHS83"}
SRC/APP
  - AUTH
    - @SHOWPASSWORD
      - page.tsx (props.SHOWPASSWORD)
    - @SHOWLOGIN
      - page.tsx (props.SHOWLOGIN)
    - layout.tsx
    - page.tsx

- These @ routes are ONLY accessible through props in "layout.tsx"
```

### Router Groups

- These are used to transparently Group routes together
- Can also be used to group different apps into one app

```plaintext {"id":"01HKQTYPERYF53Y9Z3DZWF0GD4"}
SRC/APP (Has 2 apps: Admins and Users)
  - (admins) (/admins will not be accessible)
    - admins
      - page.tsx (/admins will become accessible)
    - layout.tsx (can still add layout to (admins))

  - (users) (different app than (admins) with different RootLayout)
    - users
      - page.tsx
    - layout.tsx
```

## Navigation

### Static

```plaintext {"id":"01HKQPZZB2XYN6H85859Q759VW"}
import Link from "next/link";
// <Link href="/users/profile/66">User 66</Link>
```

### Programmatic

```plaintext {"id":"01HKQQ16C3M12HP3128Q876CRX"}
/*
- By default, all the components that you create inside SRC/APP are Server-side
  components.
- But hooks can only be used in Client-side components.

- With the "use client" directive, you tell NextJS to treat the file as a
  Client-side component.
*/

"use client";

import { useRouter } from "next/navigation";
const router = useRouter();
const redirect = () => router.push("/cars");
```

## Bootstrap

### Add

```sh {"id":"01HKSD4D6QK4S86HVJPWZDQ7DA"}
npm i bootstrap@5.3.2
```

```typescript {"id":"01HKSDJ2YRDSDFNNE2N7EEN3WF"}
// layout.tsx
import "bootstrap/dist/css/bootstrap.css";
```

## Pre-rendering

There are 3 ways of pre-rendering in NextJS:

- Static Generation (Default)
- Dynamic Rendering - HTML is generated on demand
- Streaming - Progressive rendering

## Send Functions By Prop from Server to Client

- Use case: You want to update Counter on backend when the user clicks on an
   "Update" button.
- You can't simply send a function that is written in a server-side component to
   a client-side component through props.
- This is known as Server Action.
- Understand Why:

   - The client-side component is actually sent to the Client.
   - But the server-side component remains on the server side.
   - So, what we're saying, is that I want to call a function that exists on the
      server-side from the client-side.
   - As you may imagine, this would require an API call.
   - So what NextJS want you to do, is to explicitly tell it, which function will
      remain on the server, and which Component will be sent to Client, from which
      that function will be called.
   - NextJS will then create a proxy of that function and send that to client.
   - And that proxy function will make an API call to the backend & return the
      result.
   - This is why, NextJS wants you to mark the function as async (because its an
      API call), so that other frontend code won't assume that function to be a
      sync function, and cause issue.

For this use case, there is also an alternative approach.

Instead of sending the function from Server to Client.
You can create a separate file, and export the function from that file.
You must also mark this file explicitly as "use server", so that NextJS can
distinguish between the Client ("use client") & the Server ("use server").

### Send Functions By Prop from Server to Client - Example Code

Prop Solution

```tsx {"id":"01HKSR8G77VE72EAEF8RE82VDY"}
// components/Counter.tsx

"use client"; // Send this Component to Client

import { useState } from "react";

/*
This is a reusable Counter (with update button) template.

When the Update button is clicked
1. count is updated, and
2. the function "counterUpdateClickHandler", received through props, is called.
*/
export default function Counter(props: { counterUpdateClickHandler: Function }) {
  const [count, setCount] = useState(0);

  console.info("components: Counter: props:", props);

  return (
    <div>
      <hr />
      <div>Count:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          props.counterUpdateClickHandler(count + 1);
        }}
      >
        Update
      </button>
    </div>
  );
}
```

```tsx {"id":"01HKSRGVJWH65W39SHYY6ZB091"}
// app/page.tsx

import Counter from "@/components/counter";

export default async function HomePage() {
  const counterUpdateClickHandler = async (count: number) => {
    'use server' // Make API call to server
    console.log("counterUpdateClickHandler: count:", count);
  }

  return (
    <>
      <Counter counterUpdateClickHandler={counterUpdateClickHandler} />
    </>
  );
}
```

Separate File Solution

```plaintext {"id":"01HKSSPMW8PXACQ385W981ZMPJ"}
src
  helpers
    actions.tsx
```

```typescript {"id":"01HKSSQ8M4QVFC4FR33WK4MTM6"}
// helpers/actions.tsx

'use server'

export async function counterUpdateClickHandler(count: number) {
  console.log("counterUpdateClickHandler: count:", count);
}
```

```tsx {"id":"01HKSTA608BNPK9BKX68864VWF"}
// components/Counter.tsx

"use client"; // Send this Component to Client

import { useState } from "react";
import { counterUpdateClickHandler } from "@/helpers/actions";

/*
This is a reusable Counter (with update button) template.

When the Update button is clicked
1. count is updated, and
2. the function "counterUpdateClickHandler", received through props, is called.
*/
export default function Counter() {
  const [count, setCount] = useState(0);

  console.info(
    "components: Counter: counterUpdateClickHandler:",
    counterUpdateClickHandler
  );

  return (
    <div>
      <hr />
      <div>Count:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          counterUpdateClickHandler(count + 1);
        }}
      >
        Update
      </button>
    </div>
  );
}
```

```tsx {"id":"01HKSTD5HCMX093YD6780DM6NV"}
// app/page.tsx
// Same as above, except you remove the "use server" function.
```

## Send Functions By Prop from Client to Server

- This is not possible.
- If it was, it would be a big security issue.
- Because what this mean, is that the Client can send any code to the Server
   for execution.

## Submit a Form & Redirect

NextJS makes this easier.
This works in the save way as "use client" and "use server".

You create a function inside `helpers/actions.tsx` for sending a post request.
This file is labeled "use server".
The client component (if any) will be labeled "use client".
It is possible that there is no client component, and the page is entirely
rendered at the server-side.
In this case the axios will work at backend only (it will request the server
that handles the post requests), and then send the built page to Client.

### Submit a Form & Redirect - Example Code

```typescript {"id":"01HKSXMZGHBN35F3HTX4NKSPHY"}
// helpers/actions.tsx

"use server";

import axios from "axios";
import { redirect } from "next/navigation";

export async function addEmployee(formState: {}, formdata: FormData) {
  try {
    const fullname = formdata.get("fullname");
    const position = formdata.get("position");
    const age = formdata.get("age");

    if (!fullname) {
      return { message: "The fullname is empty" };
    }
    if (!position) {
      return { message: "The position is empty" };
    }
    if (!age) {
      return { message: "The age is empty" };
    }

    await axios.post(`http://localhost:3004/employees`, {
      fullname: fullname,
      position: position,
      age: age,
    });
  } catch (e) {
    return { message: "Something went wrong" };
  }
  redirect("/");
}
```

```tsx {"id":"01HKSY1NZCR9M5YWQ00897CWJ5"}
// form/add/page.tsx

"use client";

import { addEmployee } from "@/helpers/actions";
import { useFormState } from "react-dom";

/*
How does useFormState work ?

First of all, useFormState is used to handle form submission.
For what we care about, all it does is await an async function (passed to it)
when "setFormState" is called and pass whatever it returns into the "formState"
variable.

- Initialize: useFormState needs an async function. For example, in the form of
  "{ message: error.message }"

- Call: Call setFormState when the form Submits & pass it the values in
  FormData format.
  This function will convert the formData values into JSON and and call your
  passed function (addEmployee) with those values.

- Once the async function resolves, then the result is passed into the
  formState variable.

That's it.
*/

export default function AddPage() {
  const initialFormState = { message: "" };
  const [formState, setFormState] = useFormState(addEmployee, initialFormState);

  return (
    <>
      <h1>Add Employee</h1>
      <form action={setFormState}>
        <input
          type="text"
          className="form-control mb-3"
          id="fullname"
          placeholder="Enter the fullname"
          name="fullname"
        />

        <input
          type="text"
          className="form-control mb-3"
          id="position"
          placeholder="Enter the position"
          name="position"
        />

        <input
          type="text"
          className="form-control mb-3"
          id="age"
          placeholder="Enter the age"
          name="age"
        />

        {formState.message ? (
          <div className="alert alert-danger" role="alert">
            {formState.message}
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary">
          Add employee
        </button>
      </form>
    </>
  );
}
```

## Adding LoadingUI, ErrorUI & NotFoundUI

NextJS makes this very simple.
You can add `loading.tsx`, `error.tsx`, & `not-found.tsx` inside the
corresponding route folder.
NextJS will try to first find them in the route folder, and if not found, it
will start moving up the folder tree looking for them.

### Adding LoadingUI, ErrorUI & NotFoundUI - Example Code

```tsx {"id":"01HKT3BAJAYF4WJXT178BXDE5Q"}
// employees/[id]/error.tsx

"use client";

export default function Error({
  error,
  reset,
}: {
  error: { message: string };
  reset: Function;
}) {
  return (
    <div>
      <h2>{error.message || "Something went wrong"}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

```tsx {"id":"01HKT3F912NXVTSTF96M1HGKET"}
// employees/[id]/loading.tsx

export default function Loading() {
  return <div>Loading employee...</div>;
}
```

```tsx {"id":"01HKT3HB716JYFNA2EDAN51V7K"}
// employees/[id]/not-found.tsx

import Link from "next/link";

export default function EmployeeNotFound() {
  return (
    <div>
      <h1>Sorry,we could not find it</h1>
      <Link href="/">Back home</Link>
    </div>
  );
}
```

```tsx {"id":"01HKT4DZK3PAP95DBZMN557F76"}
// helpers/actions.tsx

import { notFound } from "next/navigation";

export async function getEmployee(pageID: string) {
  const res = await fetch(`http://localhost:3004/employees/${pageID}`);
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}
```

```tsx {"id":"01HKT3NG5D8K2GEQ126GVD9JFP"}
// employees/[id]/page.tsx

import { getEmployee } from "@/helpers/actions";

type props = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};

export default async function EmployeeByIDPage(props: props) {
  const pageID = props.params.id;
  const employee = await getEmployee(pageID);

  console.info("EmployeeByIDPage: employee fetched:", employee);

  return (
    <>
      <h1>{employee.fullname}</h1>
      <div>
        <h4>Position:{employee.position}</h4>
        <h4>Age:{employee.age}</h4>
      </div>
    </>
  );
}
```

## Caching

When you build for production (`npm run build`), then by default, NextJS
considers all components without dynamic routing as static component.

Example:

- `/` - static component
- `/[id]` - dynamic component

A *static* component (circle) is built ONCE on the server during the build
process. It will never be re-evaluated.

A *dynamic* component (lambda) on the other hand, will be re-evaluated.

What this mean is that if you have a Homepage (`/home`) that lists all authors,
it will be built on server ONCE during the build process, and never change. So,
when you add/update an author, it won't reflect on the Homepage.

(Use `npm run start` to start the build)

### What does NextJs Cache ?

- webpage caching on client
- fetch api caching on client
- memoize identical requests on server

### When does NextJS consider a Component as Dynamic ?

- If it has a Dynamic function:

   - `cookies`, `header`, `useSearchParams`
      - `import `

- If a segment config option is specified:

   - `export const dynamic = 'auto|force-dynamic|force-static'`

      - `auto`: default behavior (is [] present in the route ?)
      - `force-dynamic`: always dynamic
      - `force-static`: always static

   - `export const revalidate = 'number'`
   - `revalidatePath("/", "layout|page")` (revalidate home; add this inside the
      API success handler to re-render a Component when an API changes).
      Requires `import { revalidatePath } from "next/cache";`

- If you pass Fetch API config option

   - `cache: 'force-cache|no-cache|no-store'`

      - `force-cache`: client will always use cache; no API call
      - `no-cache`: client will cache, but still make API call
      - `no-store`: never cache response

   - `next: { revalidate: <number> }`

- If component is part of a dynamic route: `/employees/id`

### Using Caching TLDR;

Always use fetch, & use `revalidatePath("<connected_path_name>")` in the action
after a successful API call. Remember to use
`import { revalidatePath } from "next/cache";`

### generateStaticParams

Till now, everytime you visit a page where the data has to be fetched from the
server (for example, employee with ID 2), you need to make an API call, and wait
for the server response, and then update the client page with JS.

But, what if I say that you can instead create static pages for every employee
at backend, and render them directly ?

`generateStaticParams` can do this.

Here's how:

```typescript {"id":"01HKWXMBDF57TQGVQ10M2GXKJ3"}
// 1. Go inside the Component where you want this behavior (`employees/id`)
// app/employees/[id]/page.tsx

type employee = {
  id: string;
  fullname: string;
  age: string;
  position: string;
};

type employees = employee[] | [];

export async function generateStaticParams(): Promise<
  { [key: string]: string }[]
> {
  const employees: employees = await fetch(`http://localhost:3004/employees`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(
        "employees/[id]: generateStaticParams: fetch employees: err:",
        err
      );
      return [];
    });

  return employees.map((employee) => {
    return { id: employee.id.toString() };
  });
}

/*
NextJS will use the return value of the generateStaticParams (array of objects)
at build time to replace [id] in employees/[id] for each value in array.
It will then go ahead and build those pages at build time.
You can see them inside the .next/server/app/employees
*/
```

```typescript {"id":"01HKX0APJW4VR5K654SMPQSHCJ"}
// actions.tsx

/*
Add Home & Employee ID route to revalidatePath after updating the Employee
using API.
This will re-render those 2 pages after the Update API completes, and will also
update the specific employees' static page on server with the new information,
if generateStaticParams() was used.
*/
revalidatePath(`/employees/${employee.id}`);
revalidatePath("/");

/*
Make sure you use no-cache in the PATCH request, or else, if you give the url
(`http://localhost:3004/employees/1`) and change employee's age to 19, then
again make a request to change employee's age to 21, and finally another one
to change the employee's age to 19, the last API will be ignored due to cache
(already updated age by 19).
*/
```

## Api Error Handling

```typescript {"id":"01HM1JX8SZBJE70WXF3A7ABVDA"}
// helpers/actions.tsx

export async function fetchArticles() {
  try {
    const res = await fetch("http://localhost:3004/articles");
    if (!res.ok) {
      throw new Error("Fetching articles failed");
    }

    const articles = await res.json();

    if (Object.keys(articles).length === 0) {
      throw new Error("We could not find any articles");
    }

    return articles;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
```

```tsx {"id":"01HM1K04CMJR94V4ZR9JW43C1T"}
// app/page.tsx

import MasonryComponent from "@/components/masonry";
import { fetchArticles } from "@/helpers/actions";

export default async function Home() {
  const articles = await fetchArticles();
  console.info("app/page.tsx: Home: fetchedArticles:", articles);

  return (
    <>
      <MasonryComponent data={articles} />
    </>
  );
}
```

```tsx {"id":"01HM1KAHJ3NV3NZXSWM593PZ57"}
// app/error.tsx

"use client";

import { Button } from "react-bootstrap";

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h2>{error.message}</h2>
      <Button variant="outline-primary" href="/">
        Go back home
      </Button>
    </div>
  );
}
```
