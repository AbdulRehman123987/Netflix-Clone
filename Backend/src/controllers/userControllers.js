import { User } from "../model/userModel.js";

export const addToLikedMovies=async(req,res,next)=>{
    try {
        const {email,data}=req.body;
        const user=await User.findOne({email})
        if(user){
            const { likedMovies} =user
            const movieAlreadyLiked=likedMovies.find(({id})=>(id===data.id));
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies:[...user.likedMovies,data],
                    },
                    {new:true}
                );
            } else return res.json({msg:"Movie Already Added"})
        } 
        else await User.create({email,likedMovies:[data]});
        return res.json({msg:"Movie Added Successfully"})
    } catch (ex){
        next(ex)
    }
}


export const getLikedMovies=async(req,res,next)=>{
    try {
        const { email }=req.params;
        const user=await User.findOne({email});
        if(user){
            res.json({msg:"success",movies:user.likedMovies})
        }
        else{
            res.json({msg:"User with given email not found"})
        }
    } catch (ex){
        next(ex)
    }
}


export const removeFromLikedMovies=async(req,res)=>{
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          const { likedMovies }=user;
          const movies = user.likedMovies;
          const movieIndex = movies.findIndex(({ id }) => id === movieId);
          if (!movieIndex) {
            res.status(400).send({ msg: "Movie not found." });
          }
          movies.splice(movieIndex, 1);
          await User.findByIdAndUpdate(
            user._id,
            {
              likedMovies,
            },
            { new: true }
          );
          return res.json({ msg: "Movie successfully removed.",movies:likedMovies });
        } 
        return res.status(404).send({ msg: "User not found." });
      } catch (error) {
        return res.status(500).json({ msg: "Error removing movie from the liked list" });
      }
}