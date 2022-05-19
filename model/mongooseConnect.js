

mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    retryWrites: true,
    w: "majority"})
    .then(()=>{
        console.log('Database connected successfully');
    })
    .catch( (err)=>{
        console.log(err);
    });
