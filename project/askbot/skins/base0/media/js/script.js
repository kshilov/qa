$(document).ready(function(){
	$('.answer-item-info-comment').click(function(){
		$('.add-comment-form').fadeIn();
		$(this).remove();
		return false;
	});
  $('.create-account').click(function(){
    $('.create-account-block').slideDown(function(){
      $(this).find('input:text').eq('0').focus();
    });
    return false;                          
  });
  $('.create-account-close').click(function(){
     $('.create-account-block').hide();
     return false;
  });
	
});