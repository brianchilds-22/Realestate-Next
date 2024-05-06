import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id required", { status: 401 });
    }
    const { userId } = sessionUser;

    //  Find user in DB
    const user = await User.findOne({ _id: userId });

    //  Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      //  if already bookmarked, Remove property from bookmarks
      user.bookmarks.pull(propertyId);
      message = "Property removed from bookmarks";
      isBookmarked = false;
    } else {
      //  Add property to bookmarks
      user.bookmarks.push(propertyId);
      message = "Property added to bookmarks";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ isBookmarked, message }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
