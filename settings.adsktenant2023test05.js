// Fusion 360 Manage connection based on APS Application
exports.clientId        = 'Uk8qYnIVMcnqJzqZWqCrCDRHw0nTcKOn';
exports.clientSecret    = 'qaADWGkxw0ESoX4Z';
exports.redirectUri     = 'http://localhost:8080/callback';
exports.tenant          = 'adsktenant2023test01'; 


// -------------------------------------------------------------------------------------------
// THEME
// Primary styling in css files also can be adjusted
let colors = {
    red     : '#dd2222',
    yellow  : '#faa21b',
    green   : '#6a9728',
    blue    : '#0696d7',
    list    : ['#CE6565', '#E0AF4B', '#E1E154', '#90D847', '#3BD23B', '#3BC580', '#3BBABA', '#689ED4', '#5178C8', '#9C6BCE', '#D467D4', '#CE5C95']
}
let vectors = {
    // red     : [221/255, 101/255, 101/255, 0.8],
    // yellow  : [225/255, 225/255,  84/255, 0.8],
    // green   : [ 59/255, 210/255,  59/255, 0.8],
    red     : [221/255,  34/255, 34/255, 0.8],
    yellow  : [250/255, 162/255, 27/255, 0.8],
    green   : [106/255, 151/255, 40/255, 0.8],
    blue    : [   0.02,    0.58,   0.84, 0.8],
    gray   : [      0.8,       0.8,      0.8, 0.6],
    white   : [      1,       1,      1, 0.8],
    list    : [
        [206/255, 101/255, 101/255, 0.8],
        [224/255, 175/255,  75/255, 0.8], 
        [225/255, 225/255,  84/255, 0.8], 
        [144/255, 216/255,  71/255, 0.8], 
        [ 59/255, 210/255,  59/255, 0.8], 
        [ 59/255, 197/255, 128/255, 0.8], 
        [ 59/255, 186/255, 186/255, 0.8], 
        [104/255, 158/255, 212/255, 0.8], 
        [ 81/255, 120/255, 200/255, 0.8], 
        [156/255, 107/255, 206/255, 0.8], 
        [212/255, 103/255, 212/255, 0.8], 
        [206/255,  92/255, 149/255, 0.8]
    ]
}


// -------------------------------------------------------------------------------------------
// CONFIGURATION SETTINGS for all applications
// The key names match the given endpoint names
// Make sure to restart your after any change to this file
exports.config = {

    'colors'  : colors,
    'vectors' : vectors,

    'explorer' : {
        'bomViewName'               : 'Details',
        'fieldIdProblemReportImage' : 'IMAGE_1',
        'wsIdProblemReports'        : 82,
        'wsIdSupplierPackages'      : 147,
        'kpis' : [{
                'id'        : 'lifecycle',
                'title'     : 'Item Lifecycle',
                'fieldId'   : 'LIFECYCLE',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : 'Working',    'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red   },
                    { 'value' : 'Production', 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]
            },{
                'id'        : 'change',
                'title'     : 'Pending Change',
                'fieldId'   : 'WORKING_CHANGE_ORDER',
                'urn'       : '',
                'type'      : 'non-empty',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : 'Yes', 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : 'No' , 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]
            },{
                'id'        : 'change-order',
                'title'     : 'Change Orders',
                'fieldId'   : 'WORKING_CHANGE_ORDER',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'type',
                'title'     : 'Type',
                'fieldId'   : 'TYPE',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'class-name',
                'title'     : 'Class',
                'fieldId'   : 'CLASS_NAME',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'pdm-category',
                'title'     : 'PDM Category',
                'fieldId'   : 'PDM_CATEGORY',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'pdm-folder',
                'title'     : 'PDM Folder',
                'fieldId'   : 'PDM_FOLDER',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'responsible-designer',
                'title'     : 'Responsible Designer',
                'fieldId'   : 'RESPONSIBLE_DESIGNER',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []          
            },{
                'id'        : 'spare-part',
                'title'     : 'Spare Part',
                'fieldId'   : 'SPARE_WEAR_PART',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : '-'        , 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : 'Wear Part' , 'count' : 0, 'color' : colors.list[2], 'vector' : vectors.yellow },
                    { 'value' : 'Spare Part', 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]      
            },{
                'id'        : 'has-pending-packages',
                'title'     : 'Has Pending Packages',
                'fieldId'   : 'HAS_PENDING_PACKAGES',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : 'Yes' , 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : '-'   , 'count' : 0, 'color' : colors.list[2], 'vector' : vectors.yellow },
                    { 'value' : 'No'  , 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]
            },{
                'id'        : 'make-or-buy',
                'title'     : 'Make or Buy',
                'fieldId'   : 'MAKE_OR_BUY',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : 'Buy' , 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : '-'   , 'count' : 0, 'color' : colors.list[2], 'vector' : vectors.yellow },
                    { 'value' : 'Make', 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]  
            },{
                'id'        : 'vendor',
                'title'     : 'Vendor',
                'fieldId'   : 'VENDOR',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []    
            },{
                'id'        : 'country',
                'title'     : 'Country',
                'fieldId'   : 'COUNTRY',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []                   
            },{
                'id'        : 'total-cost',
                'title'     : 'Total Cost',
                'fieldId'   : 'TOTAL_COST',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []    
            },{
                'id'        : 'lead-time',
                'title'     : 'Lead Time',
                'fieldId'   : 'LEAD_TIME',
                'urn'       : '',
                'type'      : 'value',
                'sort'      : 'value',
                'style'     : 'bars',
                'data'      : []
                             
            },{
                'id'        : 'long-lead-time',
                'title'     : 'Long Lead Time',
                'fieldId'   : 'LONG_LEAD_TIME',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'counters',
                'data'      : [
                    { 'value' : 'Yes' , 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : '-'   , 'count' : 0, 'color' : colors.list[2], 'vector' : vectors.yellow },
                    { 'value' : 'No'  , 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]     
            },{
                'id'        : 'material',
                'title'     : 'Material',
                'fieldId'   : 'MATERIAL',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []
            },{
                'id'        : 'total-weight',
                'title'     : 'Total Weight',
                'fieldId'   : 'TOTAL_WEIGHT',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : []  
            },{
                'id'        : 'reach',
                'title'     : 'REACH',
                'fieldId'   : 'REACH',
                'urn'       : '',
                'type'      : 'value',
                'style'     : 'bars',
                'data'      : [
                    { 'value' : 'Not Compliant' , 'count' : 0, 'color' : colors.list[0], 'vector' : vectors.red },
                    { 'value' : 'Unknown'       , 'count' : 0, 'color' : colors.list[1], 'vector' : vectors.yellow },
                    { 'value' : 'Not Validated' , 'count' : 0, 'color' : colors.list[2], 'vector' : vectors.yellow },
                    { 'value' : 'Not Required'  , 'count' : 0, 'color' : colors.list[3], 'vector' : vectors.list[0] },
                    { 'value' : 'Compliant'     , 'count' : 0, 'color' : colors.list[4], 'vector' : vectors.green }
                ]
            }
        ]    
    },
    
    'insights' : {
        'maxLogEntries' : 500000,
        'usersExcluded' : ['Administrator', 'Import User', 'Job User', 'Integration User']
    },

    'mbom' : {
        'wsIdEBOM'                      : '57',
        'wsIdMBOM'                      : '57',
        'bomViewNameEBOM'               : 'MBOM Transition',
        'bomViewNameMBOM'               : 'MBOM Transition',
        'fieldIdEBOM'                   : 'EBOM',
        'fieldIdMBOM'                   : 'MBOM',
        'fieldIdNumber'                 : 'NUMBER',
        'fieldIdTitle'                  : 'TITLE',
        'fieldIdCategory'               : 'PDM_CATEGORY',
        'fieldIdProcessCode'            : 'PROCESS_CODE',
        'fieldIdEndItem'                : 'END_ITEM',
        'fieldIdIgnoreInMBOM'           : 'IGNORE_IN_MBOM',
        'fieldIdIsProcess'              : 'IS_PROCESS',
        'fieldIdLastSync'               : 'LAST_MBOM_SYNC',
        'fieldIdLastUser'               : 'LAST_MBOM_USER',
        'fieldIdEBOMItem'               : 'IS_EBOM_ITEM',
        'fieldIdEBOMRootItem'           : 'EBOM_ROOT_ITEM',
        'fieldsToCopy'                  : ['TITLE', 'DESCRIPTION'],
        'fieldIdInstructions'           : 'INSTRUCTIONS',
        'fieldIdMarkupSVG'              : 'MARKUP_SVG',
        'fieldIdMarkupState'            : 'MARKUP_STATE',
        'revisionBias'                  : 'working', // change to release if needed
        'pinMBOMItems'                  : false,
        'suffixItemNumber'              : '-M',
        'incrementOperatonsItemNumber'  : true,
        'newDefaults'                   : [ 
            ['TYPE', { 'link' : '/api/v3/lookups/CUSTOM_LOOKUP_ITEM_TYPES/options/34' }] 
        ],
        'searches' : [
            { 'title' : 'Purchased Parts', 'query' : 'ITEM_DETAILS:CATEGORY%3DPurchased' },
            { 'title' : 'Packaging Parts', 'query' : 'ITEM_DETAILS:CATEGORY%3DPackaging' }
        ]
    },

    'portfolio' : {
        'bomViewName'       : 'Basic',
        'hierarchy'         : ['Product Categories', 'Product Lines', 'Products']
    },

    'projects' : {
        'wsIdProjects' : 86
    },

    'reports': {
        'startupReportNames' : ['Audits by Workflow State', 'CR approval status', 'DR: Rework Required', 'EX: Change Requests'],
        'startupReportCount' : 5
    },

    'reviews' : {
        'fieldIdItem'  : 'ITEM',
        'fieldIdImage' : 'IMAGE',
        'transitionId' : 'CLOSE_REVIEW',
        'workspaces' : {
            'reviews' : {
                'id'        : 76,
                'sections'  : [ { 'name' : 'Review Findings' } ],
                'states'    : [ 'Planning', 'Preparation', 'In Progress' ]
            },
            'tasks' : {
                'id' : '',
                'sections' : [ { 'name' : 'Definition' }, { 'name' : 'Schedule' } ],
                'states'    : [ 'Assigned', 'On Hold', 'In Work', 'Review', 'Complete' ]
            }
        }
    },

    'service' : {
        'bomViewName'            : 'Serddddvice',
        'fieldId'                : 'SPARE_WEAR_PART',
        'fieldValues'            : ['spare part', 'yes', 'x', 'y', 'wear part'],
        'spartPartDetails'       : ['MATERIAL', 'ITEM_WEIGHT', 'DIMENSIONS'],
        'wsIdProblemReports'     : 82,
        'wsIdSparePartsRequests' : 208
    },

    'variants' : {
        'wsIdItemVariants'       : '208',
        'variantsSectionLabel'   : 'Variant Definition',
        'fieldIdVariantBaseItem' : 'DMS_ID_BASE_ITEM',
        'fieldIdItemNumber'      : 'NUMBER',
        'fieldIdItemVariants'    : 'VARIANTS',
        'bomViewNameItems'       : 'Variant Management',
        'bomViewNameVariants'    : 'Default View'
    },

    'viewer' : {
        'fieldIdPartNumber'       : 'NUMBER',
        'partNumberProperties'    : ['Part Number', 'Name', 'label', 'Artikelnummer', 'Bauteilnummer'],
        'backgroundColor'         : 255,
        'groundReflection'        : false,
        'groundShadow'            : true
    }

}