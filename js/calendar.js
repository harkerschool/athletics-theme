// Located in #text1 of Athletics calendar page
jQuery(document).ready( function($){
    var $dates = $('#contentdiv .listcap'),
        days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    $dates.each( function() {
        var $element = $(this),
            dateObject = new Date( $element.text() );

        // get date
        day = days[dateObject.getDay()];
        date = dateObject.getDate();

        $element
            .removeClass('listcap').addClass('event_stackdate')
            .html( '<span class="event_stackdayname">' + day + '</span><span class="event_stackdaynum">' + date + '</span>');
    });
}); 