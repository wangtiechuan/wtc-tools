// import React, { Component } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { AutoSizer, List as VirtualizedList } from 'react-virtualized';

// interface ListItem {
//   // 列表项的唯一标识符
//   id: string;
//   // 列表项的内容
//   content: string;
// }

// interface ListProps {
//   // 列表数据源
//   data: ListItem[];
//   // 是否支持下拉刷新
//   canRefresh?: boolean;
//   // 是否支持上拉加载更多
//   canLoadMore?: boolean;
//   // 刷新回调函数
//   onRefresh?: () => void;
//   // 加载更多回调函数
//   onLoadMore?: () => void;
//   // 是否显示加载更多提示
//   isLoadingMore?: boolean;
//   // 是否显示刷新提示
//   isRefreshing?: boolean;
//   // 是否在列表底部显示加载更多提示
//   isEndReached?: boolean;
//   // 是否在列表顶部显示刷新提示
//   isTopReached?: boolean;
// }

// interface ListState {
//   // 当前显示的列表项
//   items: ListItem[];
//   // 是否正在加载更多数据
//   isLoadingMore: boolean;
//   // 是否正在刷新数据
//   isRefreshing: boolean;
//   // 是否已经到达列表底部
//   isEndReached: boolean;
//   // 是否已经到达列表顶部
//   isTopReached: boolean;
// }

// export class List extends Component<ListProps, ListState> {
//   constructor(props: ListProps) {
//     super(props);
//     this.state = {
//       items: props.data,
//       isLoadingMore: false,
//       isRefreshing: false,
//       isEndReached: false,
//       isTopReached: false,
//     };
//     this.handleLoadMore = this.handleLoadMore.bind(this);
//     this.handleRefresh = this.handleRefresh.bind(this);
//     this.getRowRenderer = this.getRowRenderer.bind(this);
//     this.handleScroll = this.handleScroll.bind(this);
//   }

//   // ...
// }

// class List extends Component<ListProps, ListState> {
//   async handleLoadMore() {
//     if (this.state.isLoadingMore || this.state.isEndReached) {
//       return;
//     }
//     this.setState({ isLoadingMore: true });
//     await this.props.onLoadMore?.();
//     this.setState({ isLoadingMore: false, isEndReached: true });
//   }

//   async handleRefresh() {
//     if (this.state.isRefreshing) {
//       return;
//     }
//     this.setState({ isRefreshing: true });
//     await this.props.onRefresh?.();
//     this.setState({ isRefreshing: false, isTopReached: false });
//   }

//   handleScroll(event: any) {
//     const scrollTop = event.target.scrollTop;
//     const clientHeight = event.target.clientHeight;
//     const scrollHeight = event.target.scrollHeight;
//     const isTopReached = scrollTop === 0;
//     const isEndReached = scrollTop + clientHeight >= scrollHeight;

//     this.setState({ isTopReached, isEndReached });
//   }

//   render() {
//     const {
//       canRefresh = false,
//       canLoadMore = false,
//       isLoadingMore = false,
//       isRefreshing = false,
//       isEndReached = false,
//       isTopReached = false,
//     } = this.props;

//     return (
//       <AutoSizer>
//         {({ height, width }) => (
//           <InfiniteScroll
//             dataLength={this.state.items.length}
//             next={this.handleLoadMore}
//             hasMore={!isEndReached && canLoadMore}
//             loader={isLoadingMore && <div>Loading...</div>}
//             scrollThreshold={0.9}
//             style={{ height: height }}
//           >
//             {canRefresh && (
//               <div
//                 className="list-refresh"
//                 style={{ display: isTopReached ? 'block' : 'none' }}
//               >
//                 {isRefreshing ? 'Refreshing...' : 'Release to refresh'}
//               </div>
//             )}
//             <VirtualizedList
//               rowCount={this.state.items.length}
//               rowHeight={40}
//               rowRenderer={this.getRowRenderer}
//               height={height}
//               width={width}
//               onScroll={this.handleScroll}
//             />
//             {canLoadMore && (
//               <div
//                 className="list-load-more"
//                 style={{ display: isEndReached ? 'none' : 'block' }}
//               >
//                 {isLoadingMore ? 'Loading...' : 'Load more'}
//               </div>
//             )}
//           </InfiniteScroll>
//         )}
//       </AutoSizer>
//     );
//   }
// }
