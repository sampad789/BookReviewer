/**Book Type definition  */
export type Book ={
    id:string
  }& BookData

  export type RawBook={
    id:string
  }& RawBookData

  export type RawBookData ={
    title:string,
    author:string,
    publisher:string,
    year:string,
    synopsis:string,
   tagIds:string[]
    image:string
  }
  export type SimplifiedBook={
    tags:Tag[],
    title:string,
    author:string,
    id:string,
    image:string,

  }
   
  export type BookData ={
    title:string,
    author:string,
    publisher:string,
    year:string,
    synopsis:string,
    tags:Tag[],
/** Using any for image , will check the type defination later  */
    image:string
  }
  export type Tag ={
    id:string,
    label:string
  }