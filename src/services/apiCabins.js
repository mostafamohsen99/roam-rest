import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("errror", error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  console.log("I came here");
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error(error.details);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("newCabin.img", newCabin.image);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  //1.create / edit Cabin
  let query = supabase.from("cabins");
  //A)CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B)EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  //2.upload image

  if(hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //3.Delete the cabin if there is an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin couldn't be uploaded and the cabin was not created");
  }

  return data;
}
