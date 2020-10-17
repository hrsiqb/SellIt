import React,{Component} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

class ItemCardSkeleton extends Component {
  
  render() {
    const styles = {
      margin: "30px 10px",
      width: "300px",
    }
    return (
      // <div style={styles}>
        <Card className="itemCard-card mt-1 mb-1 mr-2 ml-2" >
          <CardMedia>
            <Skeleton variant="rect" width={300} height={200} />
          </CardMedia>
          <CardContent>
            <Skeleton />
            <Skeleton width="60%" />
          </CardContent>
        </Card>  
      // </div>
      
    //   <Grid container wrap="nowrap">
    //   {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
    //     <Box key={index} width={210} marginRight={0.5} my={5}>
    //       {item ? (
    //         <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
    //       ) : (
    //         <Skeleton variant="rect" width={210} height={118} />
    //       )}

    //       {item ? (
    //         <Box pr={2}>
    //           <Typography gutterBottom variant="body2">
    //             {item.title}
    //           </Typography>
    //           <Typography display="block" variant="caption" color="textSecondary">
    //             {item.channel}
    //           </Typography>
    //           <Typography variant="caption" color="textSecondary">
    //             {`${item.views} • ${item.createdAt}`}
    //           </Typography>
    //         </Box>
    //       ) : (
    //         <Box pt={0.5}>
    //           <Skeleton />
    //           <Skeleton width="60%" />
    //         </Box>
    //       )}
    //     </Box>
    //   ))}
    // </Grid>
   )
  }
}
export default ItemCardSkeleton