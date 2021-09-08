# Instructions

To initialise server, run `node .` in this directory.

## In Postman:

### GET Request:
  `http://localhost:8080/tshirt`

Will return:

```
{
    "id": "1",
    "size": "large"
}
```

### POST Request:

`http://localhost:8080/tshirt/23`

and sending the following in the body:

```
{
    "logo": "your logo here"
}
```

Will return:

```
{
    "id": "tshirt with your esf and 23"
}
```


OR sending the following in the body:

```
{
    "logo": ""
}
```

Will return:

```
{
  "message": "We need a logo!"
}
```
