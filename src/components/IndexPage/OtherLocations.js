 const otherLinksComp = (<div style={{
       color: "#fff",
       paddingBottom: '8px',
        backgroundImage: `linear-gradient(to right bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
    }}>
        <Grid container className={classes.index_otherLinksDivider}>
             <Grid className='index_grid_item' item xs={1} md={3}/>
              <Grid className='index_grid_item' item xs={10} md={6}>
                <Typography
                  variant="display2"
                  component="h2"
                  className={classes.index_otherCitiesHeader}>
                  Discover Evergov
                </Typography>
              </Grid>
              <Grid item xs={1} md={3}/>
        </Grid>
        
        <Grid className={classes.otherLinksIndexGrid} container align="center">
            <Grid className='index_grid_item' item xs='auto' sm={1} md={2}/> 
              <Grid className={classes.index_otherLinksContainer} item xs={12} md={8}>
                {otherLinks}
            </Grid>
              <Grid className='index_grid_item' item xs='auto' sm={1} md={2}/>
        </Grid>
        <div className={this.state.isMobile ? classes.index_footer_mob : classes.index_footer}>
          <Footer dark={true} page={this.props.location.pathname} />
        </div>
      </div>)