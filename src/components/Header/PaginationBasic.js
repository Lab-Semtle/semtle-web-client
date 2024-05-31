import Pagination from 'react-bootstrap/Pagination';

function PaginationBasic({postsPerPage, totalPosts, paginate, currentPage}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  let pageSlice=[];
  pageSlice=pageNumbers.slice((Math.floor(currentPage/10)*10),Math.floor(currentPage/10)*10+9);
  const Firstpage=(number)=>{
    paginate(number);
  }
  const Prev=(currentPage)=>{
    if(currentPage<=9){
      return 1;
    }
    return (Math.floor(currentPage/10)-1)*10;
  }
  const Next=(currentPage)=>{
    console.log(totalPosts);
    if(currentPage>=Math.floor(Math.ceil(totalPosts / postsPerPage)/10)*10){
      console.log(totalPosts);
      return Math.ceil(totalPosts / postsPerPage);
    }
    return (Math.floor(currentPage/10)+1)*10;
  }

  return (
    <Pagination>
      <Pagination.First onClick={()=>Firstpage(1)}/>
      <Pagination.Prev onClick={()=>paginate(Prev(currentPage))}/>
      {pageSlice.map((number)=>(
        <Pagination.Item key={number} active={number === currentPage} onClick={()=>paginate(number)}>
        {number}
      </Pagination.Item>
      ))}
      <Pagination.Next onClick={()=>paginate(Next(currentPage))}/>
      <Pagination.Last onClick={()=>paginate(pageNumbers[pageNumbers.length-1])}/>
    </Pagination>
  );
}

export default PaginationBasic;