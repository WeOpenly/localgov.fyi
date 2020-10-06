import React, { Component } from "react";
import styles from "../spectre.min.module.css";
import { DiscussionEmbed } from "disqus-react";

class CommunityForum extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      url_slug,
    } = this.props;

    const { classes, isMobile } = this.props;

    return (
      <div>
          <h3>Ask the Community</h3>
            <p> You can ask any questions related to this service here. We will answer them as soon as possible!</p>
                  <DiscussionEmbed shortname='papergov' 
                     config={
                      {
                        url: this.props.url_slug,
                        identifier: this.props.id
                      }
                    }
                   />
            <br></br>
        
       </div>
    );
  }
}

export default CommunityForum;
