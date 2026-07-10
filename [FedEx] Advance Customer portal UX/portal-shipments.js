// Shared demo dataset for the Customer Portal search → results → detail flow.
// One reference (e.g. PO-4471-A) can be associated with several shipments.
export const PORTAL = {
  defaultReference: 'PO-4471-A',

  // The shipments associated with the searched reference.
  shipments: [
    {
      id: 'L-306881633',
      shipmentNo: 'L-306881633',
      origin: 'Monterrey, MX',
      destination: 'San Antonio, TX',
      mode: 'Cross-border FTL',
      carrier: 'Werner Enterprises (WERN)',
      status: 'in_transit',        // live | done | pending
      statusLabel: 'In transit',
      statusTone: 'live',
      etaSummary: 'ETA Fri, Jun 19',
      eta: { dateLong: 'Friday, June 19', time: '4:15 PM CDT' },
      currentLoc: 'Cleared customs · Laredo, TX',
      nextStop: 'San Antonio, TX (Delivery) · ETA Jun 19',
      mapUpdated: 'Updated 4:02 UTC',
      pct: '74', traveled: '168', remaining: '156',
      stops: [
        { kind: 'Pickup · Actual',          place: 'Monterrey, MX · Jun 14',        done: true,  current: false, upcoming: false },
        { kind: 'Export · Actual',          place: 'Nuevo Laredo, MX · Jun 15',     done: true,  current: false, upcoming: false },
        { kind: 'Customs cleared · Actual',  place: 'Laredo, TX · Jun 16',           done: true,  current: false, upcoming: false },
        { kind: 'In transit',               place: 'North of Laredo, TX · Jun 17',  done: false, current: true,  upcoming: false },
        { kind: 'Delivery · Planned',       place: 'San Antonio, TX · Jun 19',      done: false, current: false, upcoming: true }
      ],
      details: [
        { label: 'Carrier',         value: 'Werner Enterprises (WERN)' },
        { label: 'Mode',            value: 'Cross-border FTL' },
        { label: 'Bill of Lading',  value: 'BOL-0704902' },
        { label: 'Customs Entry #', value: 'ENT-4471-2260' },
        { label: 'Order #',         value: 'IO-706462-MY26' },
        { label: 'Load #',          value: '7000236710' }
      ],
      documents: [
        { name: 'Commercial Invoice',          status: 'Available', available: true, by: 'John Doe (shipper)', at: 'Jun 15, 11:48 AM' },
        { name: 'Packing List',                status: 'Available', available: true, by: 'John Doe (shipper)', at: 'Jun 15, 3:12 PM' },
        { name: 'USMCA Certificate of Origin', status: 'Available', available: true, by: 'John Doe (shipper)', at: 'Jun 15, 3:12 PM' },
        { name: 'Bill of Lading',              status: 'Available', available: true, by: 'Werner (carrier)',   at: 'Jun 14, 6:20 PM' },
        { name: 'Customs Entry (CBP 7501)',    status: 'Available', available: true, by: 'Customs broker',     at: 'Jun 16, 9:05 AM' },
        { name: 'Proof of Delivery',           status: 'Available after delivery',   pending: true }
      ],
      docsAvailable: 5
    },

    {
      id: 'L-306881702',
      shipmentNo: 'L-306881702',
      origin: 'Joliet, IL',
      destination: 'Columbus, OH',
      mode: 'LTL',
      carrier: 'Old Dominion (ODFL)',
      status: 'delivered',
      statusLabel: 'Delivered',
      statusTone: 'done',
      etaSummary: 'Delivered Jun 12',
      eta: { dateLong: 'Delivered June 12', time: '2:41 PM EDT' },
      currentLoc: 'Columbus, OH',
      nextStop: 'Delivered — signed by R. MENDEZ',
      mapUpdated: 'Updated Jun 12',
      pct: '100', traveled: '378', remaining: '0',
      stops: [
        { kind: 'Pickup · Actual',   place: 'Joliet, IL · Jun 10',     done: true, current: false, upcoming: false },
        { kind: 'Linehaul · Actual', place: 'Indianapolis, IN · Jun 11', done: true, current: false, upcoming: false },
        { kind: 'Delivery · Actual', place: 'Columbus, OH · Jun 12',   done: true, current: false, upcoming: false }
      ],
      details: [
        { label: 'Carrier',        value: 'Old Dominion (ODFL)' },
        { label: 'Mode',           value: 'LTL' },
        { label: 'Bill of Lading', value: 'BOL-0704918' },
        { label: 'Carrier PRO #',  value: 'ODFL-5521097' },
        { label: 'Order #',        value: 'IO-706471-MY26' },
        { label: 'Load #',         value: '7000236744' }
      ],
      documents: [
        { name: 'Bill of Lading',    status: 'Available', available: true },
        { name: 'Proof of Pickup',   status: 'Available', available: true },
        { name: 'Proof of Delivery', status: 'Available', available: true }
      ],
      docsAvailable: 3
    },

    {
      id: 'L-306882015',
      shipmentNo: 'L-306882015',
      origin: 'Ottawa, IL',
      destination: 'Dayton, OH',
      mode: 'Truckload',
      carrier: 'J.B. Hunt (JBHT)',
      status: 'scheduled',
      statusLabel: 'Scheduled',
      statusTone: 'pending',
      etaSummary: 'Pickup Jun 28',
      eta: { dateLong: 'Pickup June 28', time: '8:00 AM CDT' },
      currentLoc: 'Awaiting pickup',
      nextStop: 'Ottawa, IL (Pickup) · ETA Jun 28',
      mapUpdated: 'Tender accepted',
      pct: '4', traveled: '0', remaining: '352',
      stops: [
        { kind: 'Pickup · Planned',   place: 'Ottawa, IL · Jun 28',  done: false, current: false, upcoming: true },
        { kind: 'Delivery · Planned', place: 'Dayton, OH · Jun 29',  done: false, current: false, upcoming: true }
      ],
      details: [
        { label: 'Carrier',        value: 'J.B. Hunt (JBHT)' },
        { label: 'Mode',           value: 'Truckload' },
        { label: 'Bill of Lading', value: 'Pending tender' },
        { label: 'Carrier PRO #',  value: 'JBHT-4410025' },
        { label: 'Order #',        value: 'IO-706488-MY26' },
        { label: 'Load #',         value: '7000236802' }
      ],
      documents: [
        { name: 'Bill of Lading',    status: 'Available after pickup',   pending: true },
        { name: 'Proof of Pickup',   status: 'Available after pickup',   pending: true },
        { name: 'Proof of Delivery', status: 'Available after delivery', pending: true }
      ],
      docsAvailable: 0
    }
  ],

  byId(id) {
    var pool = this.shipments.concat(typeof OPS !== 'undefined' ? OPS : []);
    return pool.find(s => s.id === id) || this.shipments[0];
  }
};

// ---------------------------------------------------------------------------
// Operations dashboard dataset. A broader, live list of shipments across every
// status, each expanded into the full detail shape the Tracking page renders.
// ---------------------------------------------------------------------------
function opsWeekday(day) {
  var n = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  return n[(day - 1) % 7]; // June 2026 starts on a Monday
}
function opsBuild(r) {
  var tone = r.status === 'delivered' ? 'done' : r.status === 'scheduled' ? 'pending' : 'live';
  var labels = { exception:'Exception', out_for_delivery:'Out for Delivery', delivered:'Delivered', in_transit:'In transit', scheduled:'Scheduled' };
  var statusLabel = labels[r.status];
  var scac = (r.carrier.match(/\(([^)]+)\)/) || [])[1] || '';
  var num = r.id.replace(/[^0-9]/g, '').slice(-7);
  var O = r.origin, D = r.destination;
  var dateLong = tone === 'done' ? ('Delivered June ' + r.etaDay)
    : tone === 'pending' ? ('Pickup June ' + r.etaDay)
    : (opsWeekday(r.etaDay) + ', June ' + r.etaDay);
  var etaSummary = tone === 'done' ? ('Delivered Jun ' + r.etaDay) : tone === 'pending' ? ('Pickup Jun ' + r.etaDay) : ('ETA Jun ' + r.etaDay);
  var etaText = tone === 'done' ? ('Delivered Jun ' + r.etaDay) : ('ETA Jun ' + r.etaDay);
  var stops;
  if (r.status === 'delivered') {
    stops = [
      { kind:'Pickup · Actual',   place:O + ' · Jun ' + (r.etaDay - 2), done:true },
      { kind:'Linehaul · Actual', place:'In transit · Jun ' + (r.etaDay - 1), done:true },
      { kind:'Delivery · Actual', place:D + ' · Jun ' + r.etaDay, done:true }
    ];
  } else if (r.status === 'out_for_delivery') {
    stops = [
      { kind:'Pickup · Actual',   place:O + ' · Jun ' + (r.etaDay - 1), done:true },
      { kind:'Linehaul · Actual', place:'In transit · Jun ' + r.etaDay, done:true },
      { kind:'Out for delivery',  place:D + ' · Jun ' + r.etaDay, current:true },
      { kind:'Delivery · Planned',place:D + ' · Jun ' + r.etaDay, upcoming:true }
    ];
  } else if (r.status === 'scheduled') {
    stops = [
      { kind:'Pickup · Planned',   place:O + ' · Jun ' + r.etaDay, upcoming:true },
      { kind:'Delivery · Planned', place:D + ' · Jun ' + (r.etaDay + 1), upcoming:true }
    ];
  } else {
    stops = [
      { kind:'Pickup · Actual', place:O + ' · Jun ' + (r.etaDay - 2), done:true },
      { kind:'In transit',      place:(r.loc || 'In transit') + ' · Jun ' + (r.etaDay - 1), current:true },
      { kind:'Delivery · Planned', place:D + ' · Jun ' + r.etaDay, upcoming:true }
    ];
  }
  stops = stops.map(function (s) { return { kind:s.kind, place:s.place, done:!!s.done, current:!!s.current, upcoming:!!s.upcoming }; });
  var pct = r.status === 'delivered' ? '100' : r.status === 'out_for_delivery' ? '92' : r.status === 'scheduled' ? '4' : r.status === 'exception' ? '52' : '62';
  var docs = r.status === 'delivered'
    ? [ { name:'Bill of Lading', status:'Available', available:true }, { name:'Proof of Pickup', status:'Available', available:true }, { name:'Proof of Delivery', status:'Available', available:true } ]
    : r.status === 'scheduled'
    ? [ { name:'Bill of Lading', status:'Available after pickup', pending:true }, { name:'Proof of Pickup', status:'Available after pickup', pending:true }, { name:'Proof of Delivery', status:'Available after delivery', pending:true } ]
    : [ { name:'Bill of Lading', status:'Available', available:true }, { name:'Proof of Pickup', status:'Available', available:true }, { name:'Proof of Delivery', status:'Available after delivery', pending:true } ];
  var currentLoc = r.status === 'delivered' ? D : r.status === 'scheduled' ? 'Awaiting pickup' : r.status === 'out_for_delivery' ? ('Out for delivery · ' + D) : (r.loc || 'In transit');
  var mapUpdated = (r.updated && /ago|Tender|accepted/i.test(r.updated)) ? r.updated : ('Updated Jun ' + r.etaDay);
  return {
    id:r.id, shipmentNo:r.id, orderNo:'IO-' + num + '-MY26', origin:O, destination:D, mode:r.mode, carrier:r.carrier, scac:scac,
    status:r.status, statusLabel:statusLabel, statusTone:tone, deliveredToday:!!r.deliveredToday,
    customer:r.customer, exceptionReason:r.reason || '',
    etaDay:r.etaDay, etaSummary:etaSummary, etaText:etaText, etaTime:r.time || '',
    updatedText:r.updated || '', updatedOrder:(r.order != null ? r.order : 99999),
    eta:{ dateLong:dateLong, time:r.time || '' },
    currentLoc:currentLoc, nextStop:'', mapUpdated:mapUpdated,
    pct:pct, traveled:pct, remaining:'—',
    stops:stops,
    details:[
      { label:'Carrier', value:r.carrier }, { label:'Mode', value:r.mode },
      { label:'Bill of Lading', value:'BOL-' + num }, { label:'Carrier PRO #', value:scac + '-' + num },
      { label:'Order #', value:'IO-' + num + '-MY26' }, { label:'Load #', value:'70' + num }
    ],
    documents:docs, docsAvailable:docs.filter(function (d) { return d.available; }).length
  };
}

export const OPS = [
  // Exceptions
  { id:'L-30690101', origin:'Laredo, TX',     destination:'Detroit, MI',        mode:'Truckload',   carrier:'Schneider (SCNN)',      status:'exception', etaDay:19, loc:'Near St. Louis, MO',        customer:'Northwind Foods',       time:'3:40 PM CST', updated:'12 min ago', order:12, reason:'Winter storm slowing transit near St. Louis.' },
  { id:'L-30690145', origin:'Long Beach, CA', destination:'Phoenix, AZ',        mode:'Intermodal',  carrier:'J.B. Hunt (JBHT)',      status:'exception', etaDay:20, loc:'Port of Long Beach, CA',    customer:'Contoso Electronics',   time:'9:10 AM PST', updated:'48 min ago', order:48, reason:'Held for a routine customs inspection at the port.' },
  { id:'L-30690182', origin:'Newark, NJ',     destination:'Columbus, OH',       mode:'LTL',         carrier:'Estes (EXLA)',          status:'exception', etaDay:18, loc:'Near Harrisburg, PA',       customer:'Initech',               time:'11:25 AM EST', updated:'5 min ago', order:5,  reason:'Mechanical breakdown — carrier dispatching recovery.' },
  // Out for delivery
  { id:'L-30690210', origin:'Memphis, TN',    destination:'Nashville, TN',      mode:'Parcel',      carrier:'FedEx Freight (FXFE)',  status:'out_for_delivery', etaDay:17, loc:'Nashville, TN', customer:'FedEx Retail',       time:'2:15 PM CST', updated:'3 min ago',  order:3 },
  { id:'L-30690233', origin:'Dallas, TX',     destination:'Austin, TX',         mode:'Truckload',   carrier:'Werner (WERN)',         status:'out_for_delivery', etaDay:17, loc:'Austin, TX',    customer:'Globex',            time:'4:00 PM CST', updated:'20 min ago', order:20 },
  { id:'L-30690251', origin:'Chicago, IL',    destination:'Milwaukee, WI',      mode:'LTL',         carrier:'Old Dominion (ODFL)',   status:'out_for_delivery', etaDay:17, loc:'Milwaukee, WI', customer:'Umbrella Health',   time:'1:30 PM CST', updated:'9 min ago',  order:9 },
  { id:'L-30690278', origin:'Seattle, WA',    destination:'Portland, OR',       mode:'Parcel',      carrier:'FedEx Freight (FXFE)',  status:'out_for_delivery', etaDay:17, loc:'Portland, OR',  customer:'Stark Industries',  time:'5:45 PM PST', updated:'31 min ago', order:31 },
  // Delivered today
  { id:'L-30690302', origin:'Atlanta, GA',    destination:'Charlotte, NC',      mode:'Truckload',   carrier:'Knight-Swift (KNX)',    status:'delivered', deliveredToday:true, etaDay:17, customer:'Wayne Enterprises', time:'10:14 AM EST', updated:'2 hr ago', order:120 },
  { id:'L-30690331', origin:'Houston, TX',    destination:'San Antonio, TX',    mode:'LTL',         carrier:'XPO (XPOL)',            status:'delivered', deliveredToday:true, etaDay:17, customer:'FedEx Retail',       time:'8:02 AM CST',  updated:'4 hr ago', order:240 },
  { id:'L-30690357', origin:'Denver, CO',     destination:'Salt Lake City, UT', mode:'Truckload',   carrier:'Schneider (SCNN)',      status:'delivered', deliveredToday:true, etaDay:17, customer:'Northwind Foods',   time:'12:41 PM MST', updated:'1 hr ago', order:60 },
  // In transit
  { id:'L-30690380', origin:'Kansas City, MO',destination:'Oklahoma City, OK',  mode:'Truckload',   carrier:'J.B. Hunt (JBHT)',      status:'in_transit', etaDay:19, loc:'Near Wichita, KS',              customer:'Globex',              time:'6:20 PM CST', updated:'15 min ago', order:15 },
  { id:'L-30690404', origin:'Shanghai, CN',   destination:'Los Angeles, CA',    mode:'Ocean FCL',   carrier:'Maersk (MAEU)',         status:'in_transit', etaDay:24, loc:'Mid-Pacific — vessel underway', customer:'Contoso Electronics', time:'7:00 AM PST', updated:'3 hr ago',   order:180 },
  { id:'L-30690429', origin:'Frankfurt, DE',  destination:'Chicago, IL',        mode:'Air',         carrier:'Lufthansa Cargo (LH)',  status:'in_transit', etaDay:18, loc:'In flight — North Atlantic',    customer:'Stark Industries',    time:'2:30 PM CST', updated:'52 min ago', order:52 },
  { id:'L-30690453', origin:'Los Angeles, CA',destination:'Dallas, TX',         mode:'Rail',        carrier:'Union Pacific (UPRR)',  status:'in_transit', etaDay:21, loc:'Rail — near Tucumcari, NM',     customer:'Initech',             time:'9:15 AM CST', updated:'38 min ago', order:38 },
  // Scheduled
  { id:'L-30690478', origin:'Ottawa, IL',     destination:'Dayton, OH',         mode:'Truckload',   carrier:'J.B. Hunt (JBHT)',      status:'scheduled', etaDay:28, loc:'Awaiting pickup', customer:'Umbrella Health',   time:'8:00 AM CDT', updated:'Tender accepted', order:9990 },
  { id:'L-30690491', origin:'Joliet, IL',     destination:'Columbus, OH',       mode:'LTL',         carrier:'Old Dominion (ODFL)',   status:'scheduled', etaDay:27, loc:'Awaiting pickup', customer:'Wayne Enterprises', time:'9:30 AM CDT', updated:'Tender accepted', order:9991 }
].map(opsBuild);
