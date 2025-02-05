let workspaces  = [];
let product     = {};

$(document).ready(function() {   
    
    appendProcessing('landing', false);
    appendProcessing('search', false);
    appendProcessing('products', false);
    appendOverlay();

    getBrowserLanguage();
    setLabels();
    setUIEvents();
    getFeatureSettings('portfolio', [], function() {
        getWorkspaceIds(function() {
            getProductCatgories();
            getRecentProducts();
            getProductLines();
            getBookmarkProducts();
        });
    });

});


// Set UI Labels
function setLabels() {

    $('#landing-title').html(config.portfolio.hierarchy[0]);
    $('#lines-back').html(config.portfolio.hierarchy[0]);
    $('#lines-header').html(config.portfolio.hierarchy[1]);
    $('#products-back').html(config.portfolio.hierarchy[1]);
    $('#products-header').html(config.portfolio.hierarchy[2]);

}


// Set UI Controls
function setUIEvents() {

    
    // HEADER SEARCH
    $('#header-search').keypress(function (e) {
        if (e.which == 13) {
            searchProducts();
        }
    });
    $('#header-search-icon').click(function() {
        searchProducts();
    });


    // LANDING
    $('#landing-prev').click(function() {
        
        if($('.nav.selected').prev('.nav').length > 0) {
            $('.nav.selected').removeClass('selected').prev().addClass('selected');
            $('.dot.selected').removeClass('selected').prev().addClass('selected');
        } else {
            $('.nav.selected').removeClass('selected');
            $('.dot.selected').removeClass('selected');
            $('.nav').last().addClass('selected');
            $('.dot').last().addClass('selected');
        }
    });
    $('#landing-next').click(function() {
        if($('.nav.selected').next('.nav').length > 0) {
            $('.nav.selected').removeClass('selected').next().addClass('selected');
            $('.dot.selected').removeClass('selected').next().addClass('selected');
        } else {
            $('.nav.selected').removeClass('selected');
            $('.dot.selected').removeClass('selected');
            $('.nav').first().addClass('selected');
            $('.dot').first().addClass('selected');            
        }
    });
    $('#landing-dot-recents').click(function() {
        $('#landing-recents').addClass('selected');
        $('#landing-lines').removeClass('selected');
        $('#landing-pinned').removeClass('selected');
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    $('#landing-dot-lines').click(function() {
        $('#landing-recents').removeClass('selected');
        $('#landing-lines').addClass('selected');
        $('#landing-pinned').removeClass('selected');
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    $('#landing-dot-pinned').click(function() {
        $('#landing-recents').removeClass('selected');
        $('#landing-lines').removeClass('selected');
        $('#landing-pinned').addClass('selected');
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // PRODUCT LINES
    $('#lines-back').click(function() {
        $('#landing').show();
        $('#lines').hide();
    });


    // PRODUCTS
    $('#products-back').click(function() {
        $('#lines').show();
        $('#products').hide();
    });


    // HEADER
    $('#search-close').click(function() {
        $('#search').hide();
    });

}


// Retrieve workspace information
function getWorkspaceIds(callback) {

    $.get('/plm/workspaces', { limit : 250 }, function(response) {
        for(let level of config.portfolio.hierarchy) {
            for(let workspace of response.data.items) {
                if(workspace.title === level) {
                    workspaces.push({
                        'wsId'  : workspace.link.split('/')[4],
                        'title' : workspace.title
                    })
                }
            }
        }
        callback();
    });

}


// Retrieve Landing Page Data
function getProductCatgories() {

    $.get('/plm/search-bulk', { 'query' : '*', 'wsId' : workspaces[0].wsId }, function(response) {

        $('#landing-processing').hide();

        let elemParent = $('#landing-lines-tiles').html('');

        for(let item of response.data.items) {

            let imageIds   = getMarketingImages(item.sections);
            let title      = getSectionFieldValue(item.sections, 'MARKETING_NAME_' + languageId, '');
            let subtitle   = getSectionFieldValue(item.sections, 'MARKETING_TEXT_' + languageId, '');
            let imageLink  = getSectionFieldValue(item.sections, 'IMAGE', '');

            if(title    === '') title    = getSectionFieldValue(item.sections, 'MARKETING_NAME_1', '');
            if(subtitle === '') subtitle = getSectionFieldValue(item.sections, 'MARKETING_TEXT_1', '');

            let elemTile = genSingleTile({
                link        : item.__self__,
                imageLink   : imageLink,
                tileIcon    : 'icon-folder',
                title       : title,
                subtitle    : subtitle
            });
            
            elemTile.appendTo(elemParent);
            elemTile.click(function() {
                selectProductCategory($(this));
            });

            if(imageIds.length > 0) elemTile.attr('data-imageIds', imageIds);

        }

    });

}
function selectProductCategory(elemClicked) {

    let idParent = elemClicked.attr('data-link');

    $('#landing').hide();
    $('#lines').show();
    $('#lines').find('.tile').hide();

    $('#lines').find('.tile').each(function() {
        if($(this).attr('data-parent') === idParent) $(this).show();
    });

    $('#lines-image').html('').hide();
    $('#lines-images').html('').hide();
    $('#lines-title').html(elemClicked.find('.tile-title').html());
    $('#lines-text').html(elemClicked.find('.tile-subtitle').html());

    let elemImage = elemClicked.find('img');

    if(elemImage.length > 0) {
        elemImage.clone().appendTo($('#lines-image'));
        $('#lines-image').show();
    }

    setMarketingImages(elemClicked, $('#lines-images'));

}
function setMarketingImages(elemClicked, elemParent) {

    elemParent.html('').hide();

    let value = elemClicked.attr('data-imageIds');

    if(isBlank(value)) return;

    let imageLinks = elemClicked.attr('data-imageIds').split(',');

    for(let imageLink of imageLinks) {

        let elemDiv = $('<div></div>').appendTo(elemParent);

        appendImageFromCache(elemDiv, {
            icon        : 'icon-image',
            imageLink   : imageLink,
            link        : '',
            replace     : true,
        });

        elemDiv.click(function() {

            let elemImage = $(this).find('img');
            let url       = elemImage.attr('src');
            let elemMain  = elemImage.closest('.screen-images').prev().find('img');
            let urlMain   = elemMain.attr('src');
                
            elemMain.attr('src', url);
            elemImage.attr('src', urlMain);       
    
        });

    }

    elemParent.show();

}


// Retrieve recently viewed and bookmarked products
function getRecentProducts() {

    let links = [];

    $('#landing-tiles-recents').html('');

    $.get('/plm/recent', {}, function(response) {

        for(item of response.data.recentlyViewedItems) {
            let workspace = item.workspace.link.split('/')[4];
            if(workspace === workspaces[2].wsId) links.push(item.item.link);
        }

        for(link of links) {
            $.get('/plm/details', { 'link' : link }, function(response) {
                addProductTile(response.data, $('#landing-tiles-recents'));
            });
        }

    });

}
function getBookmarkProducts() {

    let links = [];

    $('#landing-tiles-pinned').html('');

    $.get('/plm/bookmarks', {}, function(response) {

        for(item of response.data.bookmarks) {
            let workspace = item.workspace.link.split('/')[4];
            if(workspace === workspaces[2].wsId) links.push(item.item.link);
        }

        for(link of links) {
            $.get('/plm/details', { 'link' : link }, function(response) {
                addProductTile(response.data, $('#landing-tiles-pinned'));
            });
        }

    });

}
function searchProducts() {
    
    $('#search').show();
    $('#search-results').html('');
    $('#search-processing').show();
    $('#product').hide();

    let params = {
        'wsId'      : workspaces[2].wsId,
        'offset'    : 0,
        'limit'     : 20,
        'query'     : $('#header-search').val()
    }

    let elemParent = $('#search-results');
        elemParent.html('');

    $.get('/plm/search-bulk', params, function(response) {
        for(item of response.data.items) {
            addProductTile(item, elemParent)
        }
        $('#search-processing').hide();
    });
    
}
function addProductTile(item, elemParent) {

    let title       = getSectionFieldValue(item.sections, 'MARKETING_NAME_' + languageId, '');
    let subtitle    = getSectionFieldValue(item.sections, 'MARKETING_TEXT_' + languageId, '');
    let imageLink   = getSectionFieldValue(item.sections, 'IMAGE', '');

    if(title === '') title = getSectionFieldValue(item.sections, 'MARKETING_NAME_1', '');
    if(subtitle  === '') subtitle  = getSectionFieldValue(item.sections, 'MARKETING_TEXT_1', '');

    let imageIds = getMarketingImages(item.sections);

    let elemTile = genSingleTile({
        link        : item.__self__,
        imageLink   : imageLink,
        tileIcon    : 'icon-product',
        title       : title,
        subtitle    : subtitle
    });

    elemTile.appendTo(elemParent)
        .addClass('product')
        .attr('data-title', item.title)
        .attr('data-imageIds', imageIds)
        .click(function() {
            selectProduct($(this));
        });

}


// Retrieve data for first level of navigation
function getProductLines() {

    $.get('/plm/search-bulk', { 'query' : '*', 'wsId' : workspaces[1].wsId }, function(response) {

        let elemParent = $('#lines-tiles').html('');

        for(let item of response.data.items) {

            let imageIds    = getMarketingImages(item.sections);
            let title       = getSectionFieldValue(item.sections, 'MARKETING_NAME_' + languageId, '');
            let subtitle    = getSectionFieldValue(item.sections, 'MARKETING_TEXT_' + languageId, '');
            let imageLink   = getSectionFieldValue(item.sections, 'IMAGE', '');

            if(title === '') title = getSectionFieldValue(item.sections, 'MARKETING_NAME_1', '');
            if(subtitle  === '') subtitle  = getSectionFieldValue(item.sections, 'MARKETING_TEXT_1', '');

            let elemTile = genSingleTile({
                link        : item.__self__,
                imageLink   : imageLink,
                tileIcon    : 'icon-folder',
                title       : title,
                subtitle    : subtitle
            });

            elemTile.attr('data-parent', getSectionFieldValue(item.sections, 'PRODUCT_CATEGORY', ''));
            elemTile.attr('data-title', item.title);
            elemTile.appendTo(elemParent);
            elemTile.click(function() {
                selectProductLine($(this));
            });

            if(imageIds.length > 0) elemTile.attr('data-imageIds', imageIds);

        }

    });

}
function selectProductLine(elemClicked) {

    $('#lines').hide();
    $('#products').show();
    $('#products-processing').show();

    $('#products-image').html('').hide();
    $('#products-images').html('').show();
    $('#products-line').html($('#lines-title').html());
    $('#products-title').html(elemClicked.find('.tile-title').html());
    $('#products-text').html(elemClicked.find('.tile-subtitle').html());

    let elemImage = elemClicked.find('img');

    if(elemImage.length > 0) {
        elemImage.clone().appendTo($('#products-image'));
        $('#products-image').show();
    }

    setMarketingImages(elemClicked, $('#products-images'));

    let parentName = elemClicked.attr('data-title');
    let elemParent = $('#products-tiles').html('');

    let params = {
        wsId    : workspaces[2].wsId,
        offset  : 0,
        limit   : 20,
        query   : 'ITEM_DETAILS:PRODUCT_LINE%3D%22' + parentName + '%22'
    }

    $.get('/plm/search-bulk', params, function(response) {

        $('#products-processing').hide();

        for(let item of response.data.items) {
            addProductTile(item, elemParent)
        }

    });

}
function getMarketingImages(sections) {

    let result = [];

    for(let i = 1; i < 5; i++) {
        let imageId = getSectionFieldValue(sections, 'IMAGE_' + i, '');
        if(imageId !== '') result.push(imageId);
    }

    return result;

}



// Product Interactions
function selectProduct(elemClicked) {

    let link = elemClicked.attr('data-link');

    $('#product').show();
    $('#product').removeClass('has-viewable');

    $.get('/plm/details', { link : link }, function(response) {
        
        product.link     = link;
        product.category = getSectionFieldValue(response.data.sections, 'PRODUCT_CATEGORY', '', 'title');
        product.line     = getSectionFieldValue(response.data.sections, 'PRODUCT_LINE', '', 'title');
        product.title    = getSectionFieldValue(response.data.sections, 'MARKETING_NAME_' + languageId, '');
        product.text     = getSectionFieldValue(response.data.sections, 'MARKETING_TEXT_' + languageId, '');
        product.ebom     = getSectionFieldValue(response.data.sections, 'ENGINEERING_BOM', '');

        insertItemSummary(link, {
            id          : 'summary',
            bookmark    : true,
            contents    : [
                { type : 'details'     , className : 'surface-level-1', params : { id : 'item-section-details', hideSections : true, sectionsIn: ['Specification'], headerLabel : 'Technical Specification' } },
                { type : 'grid'        , className : 'surface-level-1', params : { id : 'item-section-grid'   , headerLabel : 'Variants', columnsIn : ['Title', 'Region', 'SKU', 'Target Launch'] } },
                { type : 'images'      , className : 'surface-level-1', params : { id : 'item-section-images' , layout : 'grid'} },
                { type : 'attachments' , className : 'surface-level-1', params : { id : 'item-section-attachments', editable : false, tileSize : 's' , singleToolbar : 'controls'} },
                { type : 'bom'         , className : 'surface-level-1', params : { 
                    id           : 'item-section-bom', 
                    bomViewName  : config.portfolio.bomViewName,
                    collapsed    : true , 
                    hideDetails  : true,
                    tableHeaders : false,
                    onClickItem  : function(elemClicked) { onClickBOMItem(elemClicked); }
                }, link : product.ebom }
            ],
            headerTopLabel  : '<span class="product-category">' + product.category + '</span>|<span class="product-line">' + product.line + '</span>',
            hideSubtitle    : true,
            layout          : 'sections',
            openInPLM       : true,
            onClickClose    : function(id, link) { $('#product').hide(); }
        });

        if(isBlank(product.ebom)) product.ebom = product.link;

        insertViewer(product.ebom);


    });

}
function insertItemSummaryDone(id) {

    let elemButtonService = $('#button-service-portal');

    if(elemButtonService.length === 0) {

        $('<div></div>').prependTo($('#summary-controls'))
            .attr('id', 'button-service-portal')
            .addClass('button')
            .addClass('icon')
            .addClass('icon-service')
            .attr('title', 'Navigate to Services Portal for this product in a new tab')
            .click(function() {
                let itemLink = product.ebom.split('/');
                let url = document.location.href.split('/portfolio')[0];
                window.open(url + '/service?wsId=' + itemLink[4] + '&dmsId=' + itemLink[6] + '&theme=' + theme);
            });

    }

}
function insertItemSummaryDataDone(id) {

    $('<div></div>').prependTo($('#summary-content')).html(product.text);

}



// Click BOM Item
function onClickBOMItem(elemClicked) {

    let partNumber = elemClicked.attr('data-part-number');

    if(elemClicked.hasClass('selected')) {
        if(!isBlank(partNumber)) viewerSelectModel(partNumber);
    } else viewerResetSelection();

}