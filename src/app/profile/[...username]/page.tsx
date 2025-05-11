export default function Home(props: any) {
  const username = encodeURIComponent(props.params.username);
  return <div> Welcome {username}</div>;
}
