import musicApi from "./app";
/**
 *
 * @param {*}
 * obj={
 *  funcName:Enum,(必选,(commonApi)，searchSong,getSongUrl,getLyric,getComment,getSongDetail,getBatchSongDetail,getArtistSongs,getPlaylistDetail,getAlbumDetail
 *                (diffrentApi),getTopList,getArtists)
 *  vender:Enum,(qq,neteast,xiami),funcName传searchSong时，非必填，其余必填
 *  keyWord:Stirng (funcName传searchSong时必填),
 *  offset:偏移页数,searchSong,getArtistSongs,getPlaylistDetail,getArtists可选填
 *  song_id:歌曲id，getSongUrl，getLyric，getComment，getSongDetail 必填，
 *  page:页数，getComment可选填，
 *  limit:页大小，getComment，getArtistSongs，getPlaylistDetail可选填，
 *  ids:歌曲id数组，getBatchSongDetail必填
 *  artist_id:歌手id,getArtistSongs,getPlaylistDetail必填，
 *  album_id:专辑id,getAlbumDetail必填，
 *  top_list_id:排行榜id，getTopList必填，enum id可传0-23,
 *  way:途径，Enum,(qq,neteast,xiami),非必填
 * }
 */
export default async function (obj) {
  console.log(obj)
  const error_param = {
    code: 42200,
    msg: "请求参数错误"
  };
  const venders = ['netease', 'qq', 'xiami'];
  let rs;
  if (!Object.keys(musicApi).includes(obj.funcName) || !obj.funcName) {
    return error_param;
  } else if (
    (obj.vender && !venders.includes(obj.vender)) ||
    (obj.funcName !== "searchSong"&&!venders.includes(obj.way))
  ) {
    return error_param;
  } else if (obj.funcName !== "searchSong" && !obj.vender) {
    return error_param;
  } else if (!obj.way) {
    rs = await musicApi[obj.funcName](Object.values(obj));
  } else {
    rs = await musicApi[obj.way][obj.funcName](Object.values(obj));
  }
  return rs;
}