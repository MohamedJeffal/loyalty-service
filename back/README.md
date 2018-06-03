# Loyalty API

## Installation
``` bash
> npm install
```

## Launch tests
``` bash
> npm test
```

## Start server
``` bash
> npm start
```

Open [http://localhost:8000/api/hello/robert/32](http://localhost:8000/api/hello/robert/32) to 
check the provided API example route.

Todo:

Create database schemas and models:
- Users: name, id, tel, (status ?)
- Rides: id, user_id, create_price, completed_price, created_at, completed_at, points_earned

Handle producer events:
- User signup: check data + db & create user in db
- Ride created: check data + db & create ride in db
- Ride completed: check data + db & update ride in db: completed_at, completed_price, points_earned

- User tel updated: check data + db & updated user in db


Questions to ask:
- When to update status: before or after computing current completed ride earned points?
- Can a ride be created when the rider has already a pending ride (not completed yet)?
