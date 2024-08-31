import Pagination from 'react-bootstrap/Pagination';

function PaginationBasic({postsPerPage, totalPosts, paginate, currentPagPage}) {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i+1);
  }
  let pageSlice=[];
  pageSlice=pageNumbers.slice((Math.floor(currentPagPage/10)*10),Math.floor(currentPagPage/10)*10+9);
  const Firstpage=(number)=>{
    paginate(number-1);
  }

  const Prev=(currentPagPage)=>{
    if(currentPagPage<=9){
      return 1;
    }
    return (Math.floor(currentPagPage/10)-1)*10;
  }

  const Next=(currentPagPage)=>{
    if(currentPagPage>=Math.floor(Math.ceil(totalPosts / postsPerPage)/10)*10){
      return Math.ceil(totalPosts / postsPerPage);
    }
    return (Math.floor(currentPagPage/10)+1)*10;
  }

  return (
    <Pagination>
      <Pagination.First onClick={()=>Firstpage(1)}/>
      <Pagination.Prev onClick={()=>paginate(Prev(currentPagPage)-1)}/>
      {pageSlice.map((number)=>(
        <Pagination.Item key={number} active={number === currentPagPage} onClick={()=>paginate(number-1)}>
        {number}
      </Pagination.Item>
      ))}
      <Pagination.Next onClick={()=>paginate(Next(currentPagPage)-1)}/>
      <Pagination.Last onClick={()=>paginate(pageNumbers[pageNumbers.length-1]-1)}/>
    </Pagination>
  );
}

export default PaginationBasic;