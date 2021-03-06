/**
 * Each individual category that will display their children pages upon click.
 */

import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const StyledTreeItem = styled.div`
    /* background: gray; */
    margin: 5px 0;
    .header {
        padding: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .icon {
            transition: transform 0.1s;
            transform: ${(props) => (props.expanded ? "rotate(90deg)" : "rotate(0deg)")};
        }
        h3 {
            font-weight: 900;
        }
    }
    .pages {
        .active {
            color: ${(props) => props.theme.blue};
        }
        .item {
            cursor: pointer;
            display: inline-block;
            margin-left: 30px;
            padding-bottom: 3px;
        }
        .item:hover {
            text-decoration: underline;
        }
        .treeItem-enter {
            overflow-y: hidden;
            height: 0;
        }
        .treeItem-enter-active {
            height: calc(${(props) => props.num} * 25px);
            transition: all 100ms;
        }
        .treeItem-exit {
            height: calc(${(props) => props.num} * 25px);
        }
        .treeItem-exit-active {
            overflow-y: hidden;
            height: 0;
            transition: all 100ms;
        }
    }
`;

function TreeItem({ setMenu, name, emoji, pages, currentPage }) {
    const [expanded, setExpanded] = React.useState(
        pages.some((e) => e.url === currentPage)
    );

    /**
     * Renders the individual pages of the category
     */
    function renderChildren() {
        var result = [];
        for (var i in pages) {
            if (pages[i].url === currentPage)
                // Page is the active page, add active class to it and no click event
                result.push(
                    <p key={pages[i].url} className="active item">
                        {pages[i].name}
                    </p>
                );
            else
                result.push(
                    <div key={pages[i].url} onClick={() => setMenu && setMenu(false)}>
                        <Link href="/[page]" as={`/${pages[i].url}`}>
                            <p className="item">{pages[i].name}</p>
                        </Link>
                    </div>
                );
        }
        return result;
    }

    return (
        <StyledTreeItem expanded={expanded} num={pages.length}>
            {/* Category name, click to close and open */}
            <div onClick={() => setExpanded(!expanded)} className="header">
                <h3>{name}</h3>
                <MdKeyboardArrowRight className="icon" />
            </div>
            {/* Pages below the header, a conditional mount */}
            <div className="pages">
                <CSSTransition classNames="treeItem" in={expanded} timeout={100} unmountOnExit>
                    <div>{renderChildren()}</div>
                </CSSTransition>
            </div>
        </StyledTreeItem>
    );
}

export default TreeItem;
