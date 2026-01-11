import Post from "../../../../component/posts/Post"

export default function Teratas(){
    const msg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu eros, congue sit amet ante non, ultrices laoreet nisi. Morbi in sem consequat, eleifend est quis, aliquet erat. Nullam congue "
    const image = "https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const perp = {
        yazid:"abc",
        arun:"def",
        Andi: "Mahasiswa",
        Budi: "Ketua Kelas",
        Citra: "Sekretaris",
        Dewi: "Bendahara",
        Eko: "Anggota"
    }

    return(
        <>
            <Post from="Yazid Nursyafiqi" explain={msg} image={image} perpetrator={perp}/>
        </>
    )
}