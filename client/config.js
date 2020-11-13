
export default function BaseUrl(){
    if (process.env.NODE_ENV === "production"){
        return "";
    }
    else{
        console.log("In development.")
        return "http://localhost:5000"
    }
}